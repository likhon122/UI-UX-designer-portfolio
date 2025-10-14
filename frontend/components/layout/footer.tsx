export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-2">About</h3>
            <p className="text-sm text-muted-foreground">
              Professional UI/UX design portfolio showcasing premium designs for your projects.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-2">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/designs" className="text-muted-foreground hover:text-foreground">Browse Designs</a></li>
              <li><a href="/pricing" className="text-muted-foreground hover:text-foreground">Pricing Plans</a></li>
              <li><a href="/auth/login" className="text-muted-foreground hover:text-foreground">Login</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-2">Contact</h3>
            <p className="text-sm text-muted-foreground">
              Get in touch for custom design solutions.
            </p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Designer Portfolio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
