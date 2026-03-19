const Footer = () => {
  return (
    <footer className="py-8 px-6 text-center">
      <p className="text-sm text-muted-foreground font-body">
        © {new Date().getFullYear()} paus. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
