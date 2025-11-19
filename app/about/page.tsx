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
						<p><b>PELIZZA PICTURES</b> est une agence créative indépendante au
							style affirmé, spécialisée dans la création de contenus visuels
							et audiovisuels sur mesure. De la conception à la livraison,
							nous accompagnons chaque projet avec exigence et :
							direction artistique, écriture, production, réalisation,
							postproduction. Marque, artiste, média, organisateur
							d’événement, nous donnons vie à des contenus authentiques
							en harmonie avec votre vision.</p>
						<p><b>PELIZZA PICTURES</b> is a bold, independent creative agency
							specializing in the design and production of custom visual
							and audiovisual content. From concept to delivery, we guide
							every project with precision and an eye for detail—art
							direction, writing, production, directing, and post-production.
							Whether you are a brand, an artist, a media outlet or an
							event organizer, we bring to life authentic, impactful content
							that perfectly reflects your vision.</p>
						<p><b>PELIZZA PICTURES</b><bdi lang='ja'>是一家风格鲜明的独立创意机构，专注于定制
							化视觉与视听内容的创作与制作。 从创意到交付，我们以严谨和细致
							的态度陪伴每一个项目：艺术指导、撰写、制作、拍摄以及后期制
							作。 无论您是品牌、艺术家、媒体还是活动主办方，我们都能为您的
							愿景打造真实且富有影响力的内容</bdi></p>
						<p><bdi lang='ar'>تُعد</bdi><b> PELIZZA PICTURES </b><bdi lang='ar'> وكالة إبداعیة مستقلة ذات أسلوب ممیّز، متخصّصة في ابتكار وإنتاج محتوى بصري وسمعي-بصري مُصمَّم حسب الطلب. من الفكرة حتى التسلیم، نرافق كل مشروع بدقّة واھتمام بالتفاصیل: الإخراج الفني، الكتابة، الإنتاج، الإخراج، وما بعد الإنتاج. سواء كنتم علامة تجاریة، فنانًا، وسیلة إعلام أو منظّم فعالیة، فإننا نمنح رؤیتكم حیاةً من خلال محتوى .أصیل وفعّال ینسجم تمامًا مع تطلعاتكم</bdi></p>
					</div>
				</div>
				<Footer />
			</main>
		</>
	)
}