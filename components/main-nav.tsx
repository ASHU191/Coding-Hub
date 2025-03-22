// "use client"
// import Link from "next/link"
// import { usePathname } from "next/navigation"
// import { cn } from "@/lib/utils"
// import { Button } from "@/components/ui/button"
// import {
//   NavigationMenu,
//   NavigationMenuContent,
//   NavigationMenuItem,
//   NavigationMenuLink,
//   NavigationMenuList,
//   NavigationMenuTrigger,
//   navigationMenuTriggerStyle,
// } from "@/components/ui/navigation-menu"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
// import { useAuth } from "@/lib/auth-context"
// import { useRouter } from "next/navigation"

// export function MainNav() {
//   const pathname = usePathname()
//   const { user, logout } = useAuth()
//   const router = useRouter()

//   const handleLogout = () => {
//     logout()
//     router.push("/")
//   }

//   return (
//     <div className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
//       <div className="container flex h-16 items-center px-4">
//         <Link href="/" className="mr-6 flex items-center space-x-2">
//           <span className="hidden font-bold sm:inline-block">GeeksCode</span>
//         </Link>
//         <NavigationMenu className="hidden md:flex">
//           <NavigationMenuList>
//             <NavigationMenuItem>
//               <Link href="/" legacyBehavior passHref>
//                 <NavigationMenuLink
//                   className={cn(navigationMenuTriggerStyle(), "bg-transparent", {
//                     "text-primary": pathname === "/",
//                   })}
//                 >
//                   Home
//                 </NavigationMenuLink>
//               </Link>
//             </NavigationMenuItem>
//             <NavigationMenuItem>
//               <Link href="/hackathons" legacyBehavior passHref>
//                 <NavigationMenuLink
//                   className={cn(navigationMenuTriggerStyle(), "bg-transparent", {
//                     "text-primary": pathname === "/hackathons" || pathname.startsWith("/hackathons/"),
//                   })}
//                 >
//                   Hackathons
//                 </NavigationMenuLink>
//               </Link>
//             </NavigationMenuItem>
//             <NavigationMenuItem>
//               <NavigationMenuTrigger
//                 className={cn("bg-transparent", {
//                   "text-primary": pathname === "/resources" || pathname === "/leaderboard",
//                 })}
//               >
//                 Resources
//               </NavigationMenuTrigger>
//               <NavigationMenuContent>
//                 <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
//                   <li className="row-span-3">
//                     <NavigationMenuLink asChild>
//                       <a
//                         className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
//                         href="/resources"
//                       >
//                         <div className="mb-2 mt-4 text-lg font-medium">Resources</div>
//                         <p className="text-sm leading-tight text-muted-foreground">
//                           Explore tutorials, guides, and tools to help you succeed in hackathons.
//                         </p>
//                       </a>
//                     </NavigationMenuLink>
//                   </li>
//                   <li>
//                     <Link href="/resources" legacyBehavior passHref>
//                       <NavigationMenuLink
//                         className={cn(
//                           "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
//                           {
//                             "bg-accent text-accent-foreground": pathname === "/resources",
//                           },
//                         )}
//                       >
//                         <div className="text-sm font-medium leading-none">Tutorials</div>
//                         <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
//                           Step-by-step guides to help you learn new technologies.
//                         </p>
//                       </NavigationMenuLink>
//                     </Link>
//                   </li>
//                   <li>
//                     <Link href="/leaderboard" legacyBehavior passHref>
//                       <NavigationMenuLink
//                         className={cn(
//                           "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
//                           {
//                             "bg-accent text-accent-foreground": pathname === "/leaderboard",
//                           },
//                         )}
//                       >
//                         <div className="text-sm font-medium leading-none">Leaderboard</div>
//                         <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
//                           See the top performers and winners from past hackathons.
//                         </p>
//                       </NavigationMenuLink>
//                     </Link>
//                   </li>
//                 </ul>
//               </NavigationMenuContent>
//             </NavigationMenuItem>
//             <NavigationMenuItem>
//               <NavigationMenuTrigger
//                 className={cn("bg-transparent", {
//                   "text-primary": pathname === "/about" || pathname === "/contact",
//                 })}
//               >
//                 About
//               </NavigationMenuTrigger>
//               <NavigationMenuContent>
//                 <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
//                   <li>
//                     <Link href="/about" legacyBehavior passHref>
//                       <NavigationMenuLink
//                         className={cn(
//                           "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
//                           {
//                             "bg-accent text-accent-foreground": pathname === "/about",
//                           },
//                         )}
//                       >
//                         <div className="text-sm font-medium leading-none">About Us</div>
//                         <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
//                           Learn about our mission and the team behind GeeksCode.
//                         </p>
//                       </NavigationMenuLink>
//                     </Link>
//                   </li>
//                   <li>
//                     <Link href="/contact" legacyBehavior passHref>
//                       <NavigationMenuLink
//                         className={cn(
//                           "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
//                           {
//                             "bg-accent text-accent-foreground": pathname === "/contact",
//                           },
//                         )}
//                       >
//                         <div className="text-sm font-medium leading-none">Contact</div>
//                         <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
//                           Get in touch with us for support, feedback, or partnership opportunities.
//                         </p>
//                       </NavigationMenuLink>
//                     </Link>
//                   </li>
//                 </ul>
//               </NavigationMenuContent>
//             </NavigationMenuItem>
//             <NavigationMenuItem>
//               <Button
//                 className="bg-primary hover:bg-primary/80 transition-all duration-300"
//                 onClick={() => router.push("/hackathons")}
//               >
//                 Join Hackathons
//               </Button>
//             </NavigationMenuItem>
//           </NavigationMenuList>
//         </NavigationMenu>
//         <div className="flex flex-1 items-center justify-end space-x-4">
//           {user ? (
//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <Button variant="ghost" className="relative h-8 w-8 rounded-full">
//                   <Avatar className="h-8 w-8">
//                     <AvatarImage src={user.avatar} alt={user.name} />
//                     <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
//                   </Avatar>
//                 </Button>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent className="w-56" align="end" forceMount>
//                 <DropdownMenuLabel className="font-normal">
//                   <div className="flex flex-col space-y-1">
//                     <p className="text-sm font-medium leading-none">{user.name}</p>
//                     <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
//                   </div>
//                 </DropdownMenuLabel>
//                 <DropdownMenuSeparator />
//                 <DropdownMenuItem asChild>
//                   <Link href="/dashboard">Dashboard</Link>
//                 </DropdownMenuItem>
//                 <DropdownMenuItem asChild>
//                   <Link href="/dashboard/settings">Settings</Link>
//                 </DropdownMenuItem>
//                 {user.role === "admin" && (
//                   <DropdownMenuItem asChild>
//                     <Link href="/admin">Admin Panel</Link>
//                   </DropdownMenuItem>
//                 )}
//                 <DropdownMenuSeparator />
//                 <DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem>
//               </DropdownMenuContent>
//             </DropdownMenu>
//           ) : (
//             <div className="flex items-center gap-2">
//               <Button variant="ghost" asChild>
//                 <Link href="/login">Log in</Link>
//               </Button>
//               <Button className="bg-primary hover:bg-primary/80 transition-all duration-300" asChild>
//                 <Link href="/register">Sign up</Link>
//               </Button>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }





"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from "@/lib/auth-context"

export function MainNav() {
  const pathname = usePathname()
  const { user, logout } = useAuth()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/hackathons", label: "Hackathons" },
    { href: "/resources", label: "Resources" },
    { href: "/leaderboard", label: "Leaderboard" },
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact" },
  ]

  return (
    <div className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <span className="hidden font-bold sm:inline-block">GeeksCode</span>
        </Link>

        <div className="flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn("text-sm font-medium", {
                "text-primary": pathname === link.href,
              })}
            >
              {link.label}
            </Link>
          ))}

          <Button
            onClick={() => router.push("/hackathons")}
            className="bg-primary hover:bg-primary/80"
          >
            Join Hackathons
          </Button>
        </div>

        <div className="flex items-center space-x-4">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard">Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/settings">Settings</Link>
                </DropdownMenuItem>
                {user.role === "admin" && (
                  <DropdownMenuItem asChild>
                    <Link href="/admin">Admin Panel</Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="ghost" asChild>
                <Link href="/login">Log in</Link>
              </Button>
              <Button className="bg-primary hover:bg-primary/80" asChild>
                <Link href="/register">Sign up</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
