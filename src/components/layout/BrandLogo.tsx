import './BrandLogo.css';

export function BrandLogo({ footer = false }: { footer?: boolean }) {
  return (
    <span className={footer ? 'brand-logo brand-logo--footer' : 'brand-logo'}>
      <span className="brand-logo__mark" aria-hidden="true">+</span>
      <span className="brand-logo__name">Doctor Care Plus</span>
    </span>
  );
}
