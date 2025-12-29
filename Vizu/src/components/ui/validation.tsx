import type { ValidationPrpos } from "@/lib/type"
import { Label } from "./label"
import "@/App.css"

export const Validation = (props: ValidationPrpos ) => {
    const {
        visible,
        text,
        variant = "error" // "error", "success", "info"
    } = props
    
    if (!visible || !text) return null
    
    const variantClasses: Record<"error" | "success" | "info", string> = {
        error: "validation-error",
        success: "validation-success",
        info: "validation-info"
    }
    
    return (
        <div className={`validation ${variantClasses[variant] || ''}`}>
            <Label>{text}</Label>
        </div>
    )
}