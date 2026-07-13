import { Link } from "@tanstack/react-router";
import logoImg from "@/assets/logo.png";

export function Footer() {
  return (
    <footer className="bg-primary border-t border-accent/30 text-on-primary/80">
      <div className="mx-auto max-w-[1200px] px-6 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 gap-10 pb-12 border-b border-white/10 md:grid-cols-12 md:gap-8">
          {/* Logo & Description Column */}
          <div className="md:col-span-4 flex flex-col items-start gap-4">
            <Link to="/" className="flex items-center gap-3">
              <img
                src={logoImg}
                alt="SAT Sharks"
                className="h-14 w-auto opacity-95 transition-opacity hover:opacity-100"
                style={{ filter: "brightness(0) invert(1)" }}
              />
            </Link>
            <p className="font-body text-xs leading-relaxed text-on-primary/60 max-w-sm">
              Empowering students worldwide to conquer the digital SAT and secure admissions at elite universities.
            </p>
          </div>

          {/* Column 1: Prep */}
          <div className="md:col-span-3 flex flex-col gap-4">
            <h4 className="font-display text-sm font-extrabold uppercase tracking-wider text-on-primary">
              SAT Prep
            </h4>
            <ul className="flex flex-col gap-2.5 font-body text-xs font-semibold">
              <li>
                <Link to="/dashboard/sat-tests" className="hover:text-accent transition-colors duration-300">
                  Diagnostic Tests
                </Link>
              </li>
              <li>
                <Link to="/dashboard/practice" className="hover:text-accent transition-colors duration-300">
                  Practice Questions
                </Link>
              </li>
              <li>
                <Link to="/subscriptions" className="hover:text-accent transition-colors duration-300">
                  Pricing & Plans
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Consulting */}
          <div className="md:col-span-3 flex flex-col gap-4">
            <h4 className="font-display text-sm font-extrabold uppercase tracking-wider text-on-primary">
              Consulting
            </h4>
            <ul className="flex flex-col gap-2.5 font-body text-xs font-semibold">
              <li>
                <Link to="/consulting" className="hover:text-accent transition-colors duration-300">
                  College Matcher
                </Link>
              </li>
              <li>
                <Link to="/success-stories" className="hover:text-accent transition-colors duration-300">
                  Success Stories
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-accent transition-colors duration-300">
                  Counseling
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact/Company */}
          <div className="md:col-span-2 flex flex-col gap-4">
            <h4 className="font-display text-sm font-extrabold uppercase tracking-wider text-on-primary">
              Company
            </h4>
            <ul className="flex flex-col gap-2.5 font-body text-xs font-semibold">
              <li>
                <Link to="/" className="hover:text-accent transition-colors duration-300">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-accent transition-colors duration-300">
                  Support
                </Link>
              </li>
              <li>
                <Link to="/booking" className="hover:text-accent transition-colors duration-300">
                  Book Session
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Compliance */}
        <div className="flex flex-col items-center justify-between gap-6 pt-8 md:flex-row text-center md:text-left">
          <div className="flex flex-col gap-1.5">
            <p className="font-body text-[10px] font-medium tracking-wider text-on-primary/50">
              © {new Date().getFullYear()} SAT Sharks. All rights reserved. Admissions Consulting & SAT Prep Excellence.
            </p>
          </div>
          
          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-body text-[10px] font-bold uppercase tracking-[0.1em] text-on-primary/60">
            <li>
              <Link to="/" className="hover:text-accent transition-colors duration-300">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:text-accent transition-colors duration-300">
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
