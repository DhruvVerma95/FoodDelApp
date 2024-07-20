export default function Button({ children, textOnly, className, ...props }) {
    const cssClass = textOnly ? `text-button ${className}` : 'button';

    return <button {...props} className={cssClass}>{children}</button>
}