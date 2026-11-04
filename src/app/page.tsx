import { Contact } from '@/components/contact/Contact';
import { Hero } from '@/components/hero/Hero';
import { About } from '@/components/sections/About';
import { Education } from '@/components/sections/Education';
import { ExperienceSection } from '@/components/sections/Experience';
import { Projects } from '@/components/sections/Projects';
import { Skills } from '@/components/sections/Skills';
import { getContent } from '@/lib/content';

export default async function Home() {
	const { profile, experience, education, projects, skills } = await getContent();
	return (
		<>
			<Hero profile={profile} currentRoles={experience.filter((e) => e.current)} />
			<About profile={profile} experience={experience} />
			<ExperienceSection experience={experience} />
			<Projects projects={projects} />
			<Skills skills={skills} />
			<Education education={education} />
			<Contact
				profile={profile}
				formEndpoint={process.env.WEB3_FORM_API_URL ?? 'https://api.web3forms.com/submit'}
				formAccessKey={process.env.WEB3_FORM_API_KEY ?? ''}
			/>
		</>
	);
}
