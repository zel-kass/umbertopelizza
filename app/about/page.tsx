'use client';

import './about.css'

import NavBar from "@/app/components/NavBar"
import Footer from "@/app/components/Footer";

export default function About() {
	return (
		<>
			<NavBar />
			<main className="about-wrapper">
				<div className="about-content">
					<h1>ABOUT</h1>
					<div className="about-content__text">
						<p><b>PELIZZA PICTURES</b> est une agence créative indépendante au style affirmé, 
							spécialisée dans la création de contenus visuels et audiovisuels sur mesure. 
							Agence à taille humaine, nous accompagnons chaque projet de la conception à 
							la livraison avec exigence et sens du détail, en prenant en charge l’ensemble
							du processus créatif : direction artistique, écriture, production, réalisation 
							et postproduction. Marques, artistes, médias ou organisateurs d’événements,
							nous donnons vie à des contenus authentiques, efficaces et fidèles à votre vision.</p>
						<p><b>PELIZZA PICTURES</b> s an independent creative agency with a distinctive style, specializing in tailor-made visual and audiovisual content. A small, close-knit agency, we support each project from concept to delivery with rigor and attention to detail, managing the entire creative process: art direction, writing, production, filming, and post-production. Brands, artists, media outlets, or event organizers—we bring authentic, impactful content to life, faithful to your vision.</p>
						<p><b>PELIZZA PICTURES</b><bdi lang='ja'>是一家独立创意机构，风格鲜明，专注于定制化的视觉和视听内容。作为一家家族式管理的创意机构，我们从概念到交付全程陪伴每一个项目，秉持严谨和对细节的关注，涵盖整个创作流程：艺术指导、文案创作、制作、拍摄及后期制作。无论是品牌、艺术家、媒体还是活动组织者，我们都致力于打造真实、有影响力、忠于您理念的内容。</bdi></p>
						<p><bdi lang='ar'>تُعد</bdi><b> PELIZZA PICTURES </b><bdi lang='ar'>  هي وكالة إبداعية مستقلة ذات أسلوب مميز، متخصصة في إنتاج محتوى بصري وسمعي بصري حسب الطلب. كشركة عائلية صغيرة، ندعم كل مشروع من الفكرة إلى التسليم بدقة واهتمام بالتفاصيل، مع إدارة جميع مراحل العملية الإبداعية: الإخراج الفني، الكتابة، الإنتاج، التصوير، وما بعد الإنتاج. سواء كانت العلامات التجارية، الفنانون، وسائل الإعلام أو منظمو الفعاليات، نحن نحول أفكاركم إلى محتوى أصيل وفعّال يعكس رؤيتكم بدقة.</bdi></p>
					</div>
				</div>
				<Footer />
			</main>
		</>
	)
}
