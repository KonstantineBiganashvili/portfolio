import ReactMarkdown, { type Components } from 'react-markdown';

const components: Components = {
	// CMS markdown never needs raw images or headings above h2 on these pages.
	h1: ({ children }) => <h2>{children}</h2>,
	img: () => null,
	a: ({ href, children }) => {
		const external = typeof href === 'string' && /^https?:\/\//.test(href);
		return (
			<a href={href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
				{children}
			</a>
		);
	},
};

/** Renders CMS markdown. react-markdown ignores raw HTML by default, so CMS content can't inject markup. */
export function Markdown({ children }: { children: string }) {
	return (
		<ReactMarkdown components={components} skipHtml>
			{children}
		</ReactMarkdown>
	);
}
