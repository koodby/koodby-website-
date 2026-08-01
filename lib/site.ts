/**
 * Central site constants. Public contact details live here so they can be
 * updated in one place.
 *
 * [TODO: Tarzan] Replace WHATSAPP_NUMBER with the real number (international
 * format, digits only, no "+"). It is currently a placeholder.
 */
export const site = {
  email: "hello@koodby.com",
  emailDirect: "tarzan@koodby.com",
  whatsappNumber: "",
  whatsappGreeting: "Hello Koodby, I would like to discuss a project.",
  github: "https://github.com/koodby",
  linkedin: "https://www.linkedin.com/company/koodby",
} as const;

export const mailtoLink = `mailto:${site.email}`;

export const whatsappLink = site.whatsappNumber
  ? `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(site.whatsappGreeting)}`
  : mailtoLink;
