// ============================================================
// AIOS Design System — Component Library
// @caio-creator/components
//
// Saturn Theme 🪐
// Typography: Space Grotesk + Plus Jakarta Sans + JetBrains Mono
// ============================================================

// === Utility ===
export { cn } from "./lib/utils"

// === Core shadcn Components ===
export { Button, buttonVariants } from "./ui/button"
export type { ButtonProps } from "./ui/button"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from "./ui/card"

export { Input } from "./ui/input"
export type { InputProps } from "./ui/input"

export { Textarea } from "./ui/textarea"
export type { TextareaProps } from "./ui/textarea"

export { Label } from "./ui/label"

export { Badge, badgeVariants } from "./ui/badge"
export type { BadgeProps } from "./ui/badge"

export { Separator } from "./ui/separator"

export {
    Dialog, DialogPortal, DialogOverlay, DialogTrigger, DialogClose,
    DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription,
} from "./ui/dialog"

export { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs"

export { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar"

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "./ui/tooltip"

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "./ui/accordion"

export { Progress } from "./ui/progress"

export { Switch } from "./ui/switch"

export { Checkbox } from "./ui/checkbox"

export {
    Select, SelectGroup, SelectValue, SelectTrigger, SelectContent,
    SelectLabel, SelectItem, SelectSeparator,
} from "./ui/select"

export {
    DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem,
    DropdownMenuCheckboxItem, DropdownMenuRadioItem, DropdownMenuLabel,
    DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuGroup,
    DropdownMenuPortal, DropdownMenuSub, DropdownMenuSubContent,
    DropdownMenuSubTrigger, DropdownMenuRadioGroup,
} from "./ui/dropdown-menu"

export { ScrollArea, ScrollBar } from "./ui/scroll-area"

export { Skeleton } from "./ui/skeleton"

export { Alert, AlertTitle, AlertDescription } from "./ui/alert"

// === AIOS Exclusive Components ===
export { ButtonGlow } from "./ui/button-glow"
export type { ButtonGlowProps } from "./ui/button-glow"

export { CardGlass, CardGlassHeader, CardGlassTitle } from "./ui/card-glass"
export type { CardGlassProps } from "./ui/card-glass"

export { GradientText } from "./ui/gradient-text"
export type { GradientTextProps } from "./ui/gradient-text"

export { StatusBadge, statusBadgeVariants } from "./ui/status-badge"
export type { StatusBadgeProps } from "./ui/status-badge"
