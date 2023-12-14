export default function Heading({as = 'h1', className, children}){
    const Type = as;
    return <Type className={className}>{children}</Type>
}