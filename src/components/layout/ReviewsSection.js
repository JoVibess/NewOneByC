"use client";

import { useCallback, useEffect, useRef } from "react";

import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { googleReviewsContent } from "@/data/reviews";

export default function ReviewsSection({ reviews, locale = "fr" }) {
  const carouselRef = useRef(null);
  const snapTimeoutRef = useRef(null);
  const autoScrollFrameRef = useRef(null);
  const autoScrollTimeoutRef = useRef(null);
  const dragStateRef = useRef({
    isDragging: false,
    hasMoved: false,
    startX: 0,
    scrollLeft: 0
  });
  const content = googleReviewsContent[locale] || googleReviewsContent.fr;
  const loopedReviews = [...reviews, ...reviews, ...reviews];

  const getCarouselMetrics = useCallback((node) => {
    const firstCard = node.querySelector(".review-card");
    const gap = parseFloat(window.getComputedStyle(node).columnGap) || 0;
    const cardStep = firstCard ? firstCard.getBoundingClientRect().width + gap : node.clientWidth;

    return {
      cardStep,
      loopWidth: cardStep * reviews.length
    };
  }, [reviews.length]);

  const normalizeLoopPosition = useCallback((node) => {
    const { loopWidth } = getCarouselMetrics(node);

    if (!loopWidth) {
      return;
    }

    if (node.scrollLeft < loopWidth * 0.5) {
      node.scrollLeft += loopWidth;
    }

    if (node.scrollLeft >= loopWidth * 1.5) {
      node.scrollLeft -= loopWidth;
    }
  }, [getCarouselMetrics]);

  const animateScrollTo = useCallback((node, targetLeft, duration = 1250) => {
    const startLeft = node.scrollLeft;
    const distance = targetLeft - startLeft;
    const startTime = performance.now();
    const easeInOutCubic = (progress) =>
      progress < 0.5 ? 4 * progress * progress * progress : 1 - Math.pow(-2 * progress + 2, 3) / 2;

    if (autoScrollFrameRef.current) {
      window.cancelAnimationFrame(autoScrollFrameRef.current);
    }

    if (autoScrollTimeoutRef.current) {
      window.clearTimeout(autoScrollTimeoutRef.current);
    }

    node.classList.add("is-auto-scrolling");

    const step = (time) => {
      const progress = Math.min((time - startTime) / duration, 1);
      node.scrollLeft = startLeft + distance * easeInOutCubic(progress);

      if (progress < 1) {
        autoScrollFrameRef.current = window.requestAnimationFrame(step);
      } else {
        normalizeLoopPosition(node);
        autoScrollTimeoutRef.current = window.setTimeout(() => {
          node.classList.remove("is-auto-scrolling");
        }, 160);
      }
    };

    autoScrollFrameRef.current = window.requestAnimationFrame(step);
  }, [normalizeLoopPosition]);

  const scrollCarousel = (direction) => {
    const node = carouselRef.current;

    if (!node) {
      return;
    }

    normalizeLoopPosition(node);

    const { cardStep } = getCarouselMetrics(node);
    animateScrollTo(node, node.scrollLeft + direction * cardStep, 850);
  };

  useEffect(() => {
    const node = carouselRef.current;

    if (!node || reviews.length === 0) {
      return undefined;
    }

    const positionOnMiddleLoop = () => {
      const { loopWidth } = getCarouselMetrics(node);

      if (loopWidth) {
        node.scrollLeft = loopWidth;
      }
    };

    positionOnMiddleLoop();
    window.addEventListener("resize", positionOnMiddleLoop);

    const interval = window.setInterval(() => {
      const node = carouselRef.current;

      if (!node || dragStateRef.current.isDragging || node.classList.contains("is-auto-scrolling")) {
        return;
      }

      normalizeLoopPosition(node);

      const { cardStep } = getCarouselMetrics(node);
      animateScrollTo(node, node.scrollLeft + cardStep);
    }, 4000);

    return () => {
      window.clearInterval(interval);
      window.removeEventListener("resize", positionOnMiddleLoop);

      if (autoScrollFrameRef.current) {
        window.cancelAnimationFrame(autoScrollFrameRef.current);
      }

      if (autoScrollTimeoutRef.current) {
        window.clearTimeout(autoScrollTimeoutRef.current);
      }
    };
  }, [animateScrollTo, getCarouselMetrics, normalizeLoopPosition, reviews.length]);

  const snapToNearestCard = (node) => {
    const firstCard = node.querySelector(".review-card");

    if (!firstCard) {
      return;
    }

    const gap = parseFloat(window.getComputedStyle(node).columnGap) || 0;
    const cardStep = firstCard.getBoundingClientRect().width + gap;
    const targetIndex = Math.round(node.scrollLeft / cardStep);

    animateScrollTo(node, targetIndex * cardStep, 760);
  };

  const handlePointerDown = (event) => {
    const node = carouselRef.current;

    if (!node || (event.pointerType === "mouse" && event.button !== 0)) {
      return;
    }

    if (snapTimeoutRef.current) {
      window.clearTimeout(snapTimeoutRef.current);
    }

    dragStateRef.current = {
      isDragging: true,
      hasMoved: false,
      startX: event.clientX,
      scrollLeft: node.scrollLeft
    };
  };

  const handlePointerMove = (event) => {
    const node = carouselRef.current;
    const dragState = dragStateRef.current;

    if (!node || !dragState.isDragging) {
      return;
    }

    const distance = event.clientX - dragState.startX;

    if (Math.abs(distance) > 5) {
      dragState.hasMoved = true;
      node.classList.add("is-dragging");
      event.preventDefault();
      node.scrollLeft = dragState.scrollLeft - distance;
      normalizeLoopPosition(node);
    }
  };

  const stopDragging = (event) => {
    const node = carouselRef.current;

    if (!node || !dragStateRef.current.isDragging) {
      return;
    }

    dragStateRef.current.isDragging = false;

    if (dragStateRef.current.hasMoved) {
      snapToNearestCard(node);
      snapTimeoutRef.current = window.setTimeout(() => {
        node.classList.remove("is-dragging");
      }, 420);
    } else {
      node.classList.remove("is-dragging");
    }

    if (node.hasPointerCapture?.(event.pointerId)) {
      node.releasePointerCapture(event.pointerId);
    }
  };

  const handleReviewClick = (event) => {
    if (dragStateRef.current.hasMoved) {
      event.preventDefault();
      dragStateRef.current.hasMoved = false;
    }
  };

  return (
    <section className="reviews-section" aria-labelledby="reviews-title">
      <Container>
        <div className="reviews-section__header">
          <div>
            <Reveal>
              <p className="section-heading__eyebrow">{content.eyebrow}</p>
              <h2 id="reviews-title">{content.title}</h2>
              <p>{content.description}</p>
            </Reveal>
          </div>
          <div className="reviews-section__controls">
            <button type="button" onClick={() => scrollCarousel(-1)} aria-label={content.previous}>
              ←
            </button>
            <button type="button" onClick={() => scrollCarousel(1)} aria-label={content.next}>
              →
            </button>
          </div>
        </div>

        <div
          ref={carouselRef}
          className="reviews-carousel"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={stopDragging}
          onPointerCancel={stopDragging}
          onPointerLeave={stopDragging}
        >
          {loopedReviews.map((review, index) => (
            <a
              className="review-card"
              href={review.url}
              target="_blank"
              rel="noreferrer"
              key={`${review.url}-${index}`}
              aria-label={`${content.open} - ${review.author}`}
              draggable={false}
              onClick={handleReviewClick}
              onDragStart={(event) => event.preventDefault()}
            >
              <div className="review-card__top">
                <div className="review-card__avatar" aria-hidden="true">
                  {review.author.charAt(0)}
                </div>
                <div>
                  <h3>{review.author}</h3>
                  <div className="review-card__rating" aria-label={`${review.rating}/5`}>
                    <span aria-hidden="true">★★★★★</span>
                    <small>{review.date}</small>
                  </div>
                </div>
              </div>

              <p className="review-card__text">“{review.text}”</p>

              {review.note ? <p className="review-card__note">{review.note}</p> : null}

              <span className="review-card__link">{content.open}</span>
            </a>
          ))}
        </div>
      </Container>
    </section>
  );
}
