import Footer from "@/app/components/Footer";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex min-h-svh flex-col">
			{children}
			<div className="px-4 lg:px-8">
				<Footer />
			</div>
		</div>
	);
}
