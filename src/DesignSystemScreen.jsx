import { T } from "./theme";

export default function DesignSystemScreen({ onBack }) {
    const Card = ({ title, children }) => (
        <div style={{ marginBottom: 32 }}>
            <p style={{ fontFamily: T.fontUI, fontSize: 11, letterSpacing: "0.15em", color: T.textDisabled, textTransform: "uppercase", marginBottom: 12 }}>{title}</p>
            {children}
        </div>
    );

    const Swatch = ({ label, color }) => (
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, backgroundColor: color, border: `1px solid ${T.borderMedium}` }} />
            <div>
                <span style={{ fontFamily: T.fontUI, fontSize: 13, color: T.textPrimary, display: "block" }}>{label}</span>
                <span style={{ fontFamily: T.fontMono, fontSize: 11, color: T.textDisabled }}>{color}</span>
            </div>
        </div>
    );

    const TypeSpec = ({ name, styleObj, sampleText }) => (
        <div style={{ marginBottom: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 6 }}>
                <span style={{ fontFamily: T.fontMono, fontSize: 11, color: T.brandPrimary, fontWeight: 500 }}>{name}</span>
                <span style={{ fontFamily: T.fontMono, fontSize: 10, color: T.textDisabled }}>
                    {styleObj.fontSize}px / {styleObj.lineHeight} / {styleObj.letterSpacing}
                </span>
            </div>
            <div style={{ ...styleObj, color: T.textPrimary }}>{sampleText}</div>
        </div>
    );

    return (
        <div style={{ flex: 1, backgroundColor: T.bgBase, overflowY: "auto", position: "absolute", inset: 0, zIndex: 1000 }}>
            {/* Header */}
            <div style={{ position: "sticky", top: 0, padding: "24px 20px 16px", backgroundColor: T.bgGlass, backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", borderBottom: `1px solid ${T.borderSubtle}`, zIndex: 10, display: "flex", alignItems: "center", gap: 16 }}>
                <button onClick={onBack} className="btn-tap" style={{ width: 40, height: 40, borderRadius: 12, backgroundColor: "transparent", border: `1px solid ${T.borderMedium}`, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={T.textPrimary} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                </button>
                <div>
                    <h1 style={{ fontFamily: T.fontDisplay, fontSize: 24, color: T.textPrimary, fontWeight: 400 }}>Design System</h1>
                    <p style={{ fontFamily: T.fontUI, fontSize: 13, color: T.textSecondary }}>Edita `src/theme.js` para modificar</p>
                </div>
            </div>

            <div style={{ padding: "24px 20px 40px" }}>
                <Card title="Brand Colors">
                    <Swatch label="brandPrimary (Rojo Botero)" color={T.brandPrimary} />
                    <Swatch label="brandGreen (Confirmación)" color={T.brandGreen} />
                </Card>

                <Card title="Backgrounds & Surfaces">
                    <Swatch label="bgBase (Fondo main)" color={T.bgBase} />
                    <Swatch label="bgCard (Tarjetas)" color={T.bgCard} />
                    <Swatch label="bgCardRaised (Elevadas)" color={T.bgCardRaised} />
                    <Swatch label="bgOmni (Inputs)" color={T.bgOmni} />
                </Card>

                <Card title="Text & Tokens">
                    <Swatch label="textPrimary" color={T.textPrimary} />
                    <Swatch label="textSecondary" color={T.textSecondary} />
                    <Swatch label="textDisabled" color={T.textDisabled} />
                </Card>

                <Card title="Typography Scale (Serif Display)">
                    <div style={{ border: `1px solid ${T.borderMedium}`, borderRadius: 16, padding: "20px 20px 4px", backgroundColor: T.bgCard }}>
                        <TypeSpec name="textTitleHero" styleObj={T.textTitleHero} sampleText="Museo Nacional" />
                        <div style={{ height: 1, backgroundColor: T.borderSubtle, margin: "0 0 20px" }} />
                        <TypeSpec name="textTitleLg" styleObj={T.textTitleLg} sampleText="Tu Perfil" />
                        <div style={{ height: 1, backgroundColor: T.borderSubtle, margin: "0 0 20px" }} />
                        <TypeSpec name="textTitleMd" styleObj={T.textTitleMd} sampleText="Exploración Libre" />
                        <div style={{ height: 1, backgroundColor: T.borderSubtle, margin: "0 0 20px" }} />
                        <TypeSpec name="textTitleSm" styleObj={T.textTitleSm} sampleText="Obras Populares" />
                    </div>
                </Card>

                <Card title="Typography Scale (Sans-Serif UI)">
                    <div style={{ border: `1px solid ${T.borderMedium}`, borderRadius: 16, padding: "20px 20px 4px", backgroundColor: T.bgCard }}>
                        <TypeSpec name="textUiLg" styleObj={T.textUiLg} sampleText="Párrafos amplios o botones." />
                        <div style={{ height: 1, backgroundColor: T.borderSubtle, margin: "0 0 20px" }} />
                        <TypeSpec name="textUiMd" styleObj={T.textUiMd} sampleText="Texto base para descripciones o tarjetas de obras." />
                        <div style={{ height: 1, backgroundColor: T.borderSubtle, margin: "0 0 20px" }} />
                        <TypeSpec name="textUiSm" styleObj={T.textUiSm} sampleText="Texto secundario para soporte o distancia." />
                        <div style={{ height: 1, backgroundColor: T.borderSubtle, margin: "0 0 20px" }} />
                        <TypeSpec name="textUiXs" styleObj={T.textUiXs} sampleText="Metadatos pequeños (fechas, técnicas)." />
                        <div style={{ height: 1, backgroundColor: T.borderSubtle, margin: "0 0 20px" }} />
                        <TypeSpec name="textMicroCaps" styleObj={T.textMicroCaps} sampleText="Etiquetas Superiores" />
                    </div>
                </Card>

                <Card title="Typography Scale (Monospace)">
                    <div style={{ border: `1px solid ${T.borderMedium}`, borderRadius: 16, padding: "20px 20px 4px", backgroundColor: T.bgCard }}>
                        <TypeSpec name="textMonoSm" styleObj={T.textMonoSm} sampleText="#MB19-203" />
                    </div>
                </Card>

                <Card title="Interactive Elements">
                    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                        <button className="btn-tap" style={{ width: "100%", padding: "16px 0", borderRadius: 14, backgroundColor: T.brandPrimary, border: "none", color: "white", fontFamily: T.fontUI, fontSize: 14, fontWeight: 500, cursor: "pointer" }}>
                            Primary Button
                        </button>
                        <button className="btn-tap" style={{ width: "100%", padding: "16px 0", borderRadius: 14, backgroundColor: T.bgOmni, border: `1px solid ${T.borderMedium}`, color: T.textPrimary, fontFamily: T.fontUI, fontSize: 14, fontWeight: 500, cursor: "pointer" }}>
                            Secondary Button
                        </button>
                    </div>
                </Card>
            </div>
        </div>
    );
}
