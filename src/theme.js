export const T = {
    // Paleta expandida (Dark Mode premium)
    bgBase: "#090807", // Fondo principal más profundo, menos gris
    bgCard: "#110E0C", // Tarjetas nivel 1
    bgCardRaised: "#161311", // Tarjetas elevadas
    bgGlass: "rgba(17,14,12,0.75)", // Blur fuerte
    bgOmni: "#1A1714", // Inputs, chips base
    textPrimary: "#FDF8F5", // Blanco cálido brillante
    textSecondary: "#A39991", // Texto de soporte
    textDisabled: "#675D55", // Deshabilitados
    borderSubtle: "rgba(255,255,255,0.06)", // Bordes invisibles
    borderMedium: "rgba(255,255,255,0.12)", // Líneas separadoras
    brandPrimary: "#C0392B", // Rojo Terracota Botero (más vibrante)
    brandGreen: "#2E8B57", // Verde confirmación

    // Spacing & Border Radii
    rSm: 8,
    rMd: 16,
    rLg: 24,
    rXl: 32,
    rCard: "20px",
    rMax: "32px",
    rFull: 9999,

    // Typography - Font Families
    fontDisplay: "'DM Serif Display', Georgia, serif",
    fontUI: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    fontMono: "'SF Mono', Monaco, Consolas, monospace",

    // Typography - Scale (Serifs / Displays)
    textTitleHero: { fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 40, lineHeight: "110%", letterSpacing: "-0.02em" }, // Para el título principal gigantesco
    textTitleLg: { fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 32, lineHeight: "115%", letterSpacing: "-0.01em" }, // Para títulos de nivel 1 ("Tu Perfil")
    textTitleMd: { fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 24, lineHeight: "120%", letterSpacing: "0" }, // Títulos en tarjetas, headers del bottom sheet
    textTitleSm: { fontFamily: "'DM Serif Display', Georgia, serif", fontSize: 20, lineHeight: "125%", letterSpacing: "0" }, // Títulos secundarios o nombres cortos de Obras en listas

    // Typography - Scale (Sans-Serif / UI Elements)
    textUiLg: { fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif", fontSize: 16, lineHeight: "140%", letterSpacing: "0.01em" }, // Párrafos de lectura grandes, botones primarios
    textUiMd: { fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif", fontSize: 14, lineHeight: "145%", letterSpacing: "0.01em" }, // Párrafos normales ("Toca un pin para ver detalles")
    textUiSm: { fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif", fontSize: 13, lineHeight: "140%", letterSpacing: "0.01em" }, // Subtítulos complementarios, listas
    textUiXs: { fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif", fontSize: 12, lineHeight: "140%", letterSpacing: "0.02em" }, // Fechas, Meta data de cuadros ("Óleo sobre lienzo")
    textMicroCaps: { fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif", fontSize: 10, lineHeight: "120%", letterSpacing: "0.15em", textTransform: "uppercase" }, // Overlines y Etiquetas (Ej: "OBRA SELECCIONADA")

    // Typography - Scale (Monospace)
    textMonoSm: { fontFamily: "'SF Mono', Monaco, Consolas, monospace", fontSize: 13, lineHeight: "140%", letterSpacing: "0" }, // IDs de cuadros o coordenadas numéricas ("#MB19-2")
};
