import expencTextureLarge from '~/assets/expenc-large.png';
import expencTexturePlaceholder from '~/assets/expenc-placeholder.png';
import expencTexture from '~/assets/expenc.png';
import fintracTextureLarge from '~/assets/fintrac-dark-large.png';
import fintracTexturePlaceholder from '~/assets/fintrac-dark-placeholder.png';
import fintracTexture from '~/assets/fintrac-dark.png';
import moreProjectsTexture from '~/assets/more-projects.png';
import moreProjectsTextureLarge from '~/assets/more-projects-large.png';
import moreProjectsTexturePlaceholder from '~/assets/more-projects-placeholder.png';
import { Footer } from '~/components/footer';
import { baseMeta } from '~/utils/meta';
import { Intro } from './intro';
import { Profile } from './profile';
import { ProjectSummary } from './project-summary';
import { useEffect, useRef, useState } from 'react';
import config from '~/config.json';
import styles from './home.module.css';

// Prefetch draco decoader wasm
export const links = () => {
  return [
    {
      rel: 'prefetch',
      href: '/draco/draco_wasm_wrapper.js',
      as: 'script',
      type: 'text/javascript',
      importance: 'low',
    },
    {
      rel: 'prefetch',
      href: '/draco/draco_decoder.wasm',
      as: 'fetch',
      type: 'application/wasm',
      importance: 'low',
    },
  ];
};

export const meta = () => {
  return baseMeta({
    title: 'Designer + Developer',
    description: `Design portfolio of ${config.name} — a product designer working on web & mobile apps with a focus on motion, experience design, and accessibility.`,
  });
};

export const Home = () => {
  const [visibleSections, setVisibleSections] = useState([]);
  const [scrollIndicatorHidden, setScrollIndicatorHidden] = useState(false);
  const intro = useRef();
  const projectOne = useRef();
  const projectTwo = useRef();
  const projectThree = useRef();
  const details = useRef();

  useEffect(() => {
    const sections = [intro, projectOne, projectTwo, projectThree, details];

    const sectionObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const section = entry.target;
            observer.unobserve(section);
            if (visibleSections.includes(section)) return;
            setVisibleSections(prevSections => [...prevSections, section]);
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 }
    );

    const indicatorObserver = new IntersectionObserver(
      ([entry]) => {
        setScrollIndicatorHidden(!entry.isIntersecting);
      },
      { rootMargin: '-100% 0px 0px 0px' }
    );

    sections.forEach(section => {
      sectionObserver.observe(section.current);
    });

    indicatorObserver.observe(intro.current);

    return () => {
      sectionObserver.disconnect();
      indicatorObserver.disconnect();
    };
  }, [visibleSections]);

  return (
    <div className={styles.home}>
      <Intro
        id="intro"
        sectionRef={intro}
        scrollIndicatorHidden={scrollIndicatorHidden}
      />
      <ProjectSummary
        id="project-1"
        sectionRef={projectOne}
        visible={visibleSections.includes(projectOne.current)}
        index={1}
        title="FinTrac"
        description="A full-stack financial management platform with analytics dashboards, authentication, and responsive UI"
        buttonText="View project"
        buttonLink="https://github.com/ayush200491/FinTrac"
        model={{
          type: 'laptop',
          alt: 'FinTrac analytics dashboard',
          textures: [
            {
              srcSet: `${fintracTexture} 1280w, ${fintracTextureLarge} 2560w`,
              placeholder: fintracTexturePlaceholder,
            },
          ],
        }}
      />
      <ProjectSummary
        id="project-2"
        alternate
        sectionRef={projectTwo}
        visible={visibleSections.includes(projectTwo.current)}
        index={2}
        title="ExpenC"
        description="A modern Android expense management application focused on personal finance tracking and analytics"
        buttonText="View project"
        buttonLink="https://github.com/ayush200491/ExpenC-Personal-Expense-Management-Android-Application"
        model={{
          type: 'phone',
          alt: 'ExpenC app screen',
          textures: [
            {
              srcSet: `${expencTexture} 375w, ${expencTextureLarge} 750w`,
              placeholder: expencTexturePlaceholder,
            },
          ],
        }}
      />
      <ProjectSummary
        id="project-3"
        sectionRef={projectThree}
        visible={visibleSections.includes(projectThree.current)}
        index={3}
        title="More projects"
        description="Explore more of my work, including finance and mobile applications, on my GitHub."
        buttonText="View GitHub"
        buttonLink="https://github.com/ayush200491"
        model={{
          type: 'laptop',
          alt: 'My GitHub projects',
          textures: [
            {
              srcSet: `${moreProjectsTexture} 800w, ${moreProjectsTextureLarge} 1920w`,
              placeholder: moreProjectsTexturePlaceholder,
            },
          ],
        }}
      />
      <Profile
        sectionRef={details}
        visible={visibleSections.includes(details.current)}
        id="details"
      />
      <Footer />
    </div>
  );
};
