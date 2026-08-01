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
  facebook: "https://www.facebook.com/profile.php?id=61592602497132",
  tiktok: "https://www.tiktok.com/@koodby1?is_from_webapp=1&sender_device=pc",
} as const;

export const mailtoLink = `mailto:${site.email}`;

export const whatsappLink = site.whatsappNumber
  ? `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(site.whatsappGreeting)}`
  : mailtoLink;
