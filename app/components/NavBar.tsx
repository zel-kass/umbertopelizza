import Link from "next/link"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

export default function NavBar () {
	return(
		<header>
			<nav className="w-screen px-8 py-4 flex flex-row justify-between items-end" aria-label="Main navigation">
				<Link
					href="/"
					className="text-6xl"
				>	
					<h1>PELIZZA</h1>
				</Link>
				<span>Photo</span>
				<span>Video</span>
				<Sheet>
					<SheetTrigger>Contact</SheetTrigger>
					<SheetContent>
						<SheetHeader>
							<SheetTitle>Umberto Pelizza</SheetTitle>
							<SheetDescription>
								Contact me for more info
							</SheetDescription>
							<div className="flex flex-col">
								<span>umbertomariapelizza@gmail.com</span>
								<span>06 44 27 89 92</span>
								<span>_umbertoz</span>
							</div>
						</SheetHeader>
					</SheetContent>
				</Sheet>
			</nav>
		</header>
	)
}