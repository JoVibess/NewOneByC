import Container from "@/components/ui/Container";

export default function SiteFooter({ dictionary }) {
  return (
    <footer className="site-footer">
      <Container className="site-footer__grid">
        <div>
          <p className="site-footer__title">{dictionary.footer.contactTitle}</p>
          <p>{dictionary.contactDetails.addressLines.join(", ")}</p>
          <p>{dictionary.contactDetails.phone}</p>
          <p>{dictionary.contactDetails.email}</p>
        </div>
        <div>
          <p>{dictionary.footer.legal}</p>
          <p>{dictionary.footer.credits}</p>
        </div>
      </Container>
    </footer>
  );
}
