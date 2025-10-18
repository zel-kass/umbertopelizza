'use client'

import ReactLenis from "lenis/react";
import Footer from "@/app/components/Footer";
import NavBar from "@/app/components/NavBar";
import { getAllGalleryProjects } from "@/lib/prismic";

import gsap from "gsap";
import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";

interface GalleryImage {
  image?: {
    url: string | null | undefined;
    alt?: string;
  };
  caption?: string;
}

interface Project {
  uid: string;
  title: string;
  images: GalleryImage[];
}

interface ProjectRowProps {
  project: Project;
  isActive: boolean;
}

interface ProjectDetailsProps {
  project: Project;
  show: boolean;
}

function ProjectRow({ project, isActive }: ProjectRowProps) {
  const boxRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const hiddenOverlayRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isActive) {
      gsap.fromTo(
        overlayRef.current,
        {
          y: "-100%",
        },
        {
          y: "0%",
          duration: 0.5,
          ease: "power4.out",
        }
      );

      gsap.fromTo(
        hiddenOverlayRef.current,
        {
          y: "-100%",
        },
        {
          y: "0%",
          duration: 0.5,
          ease: "power4.out",
        }
      );
    }
  }, [isActive]);

  const onMouseEnter = (e: React.MouseEvent) => {
    if (isActive) return;
    const rect = boxRef.current?.getBoundingClientRect();
    if (!rect) return;
    const y = e.clientY - rect.top;
    const fromTop = y < rect.height / 2;

    gsap.fromTo(
      overlayRef.current,
      {},
      {
        y: fromTop ? "100%" : "-100%",
        duration: 0.5,
        ease: "power4.out",
      }
    );

    gsap.fromTo(
      hiddenOverlayRef.current,
      {
        y: fromTop ? "-200%" : "0%",
      },
      {
        y: "-100%",
        duration: 0.5,
        ease: "power4.out",
      }
    );
  };

  const onMouseLeave = (e: React.MouseEvent) => {
    if (isActive) return;
    const rect = boxRef.current?.getBoundingClientRect();
    if (!rect) return;
    const y = e.clientY - rect.top;
    const fromTop = y < rect.height / 2;

    gsap.fromTo(
      overlayRef.current,
      {
        y: fromTop ? "100%" : "-100%",
      },
      {
        y: "0%",
        duration: 0.5,
        ease: "power3.out",
      }
    );

    gsap.fromTo(
      hiddenOverlayRef.current,
      {},
      {
        y: fromTop ? "-200%" : "0%",
        duration: 0.5,
        ease: "power3.out",
      }
    );
  };

  return (
    <div
      ref={boxRef}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="h-[6em] overflow-hidden">
      <div ref={overlayRef} className="w-full h-full px-5 flex items-center justify-between">
        <h2 className="text-black font-800">{project.title}</h2>
      </div>
      <div
        ref={hiddenOverlayRef}
        className="w-full h-full px-5 flex items-center justify-between bg-black">
        <h2 className="text-white">{project.title}</h2>
      </div>
    </div>
  );
}

function ProjectDetails({ project, show }: ProjectDetailsProps) {
  const [shouldRender, setShouldRender] = useState(false);
  const boxRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (show) {
      setShouldRender(true);
    } else {
      const timeout = setTimeout(() => {
        setShouldRender(false);
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [show]);

  return (
    <div
      ref={boxRef}
      className={`grid transition-all duration-500 overflow-hidden px-5 backdrop-blur-lg 
        ${show ? "grid-rows-[1fr] py-5" : "grid-rows-[0fr]"}`}>
      <div className="overflow-hidden">
        {shouldRender && (
          <>
            {project.images.length > 0 && (
              <div className="flex gap-5 relative h-[50em] overflow-hidden">
                {project.images?.map((imageData, index) => {
                  if (!imageData.image?.url) {
                    console.warn(`Image ${index} missing URL for project ${project.title}`);
                    return null;
                  }

                  return (
                    <Image
                      key={index}
                      src={imageData.image.url}
                      alt={imageData.image.alt || `${project.title} image ${index + 1}`}
                      width={0}
                      height={0}
                      sizes="100vw"
                      style={{ width: "auto", height: "100%" }}
                      loading={index === 0 ? "eager" : "lazy"}
                      priority={index === 0}
                    />
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default function Photos() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getAllGalleryProjects();
        
        if (!data || data.length === 0) {
          setError("No gallery projects found. Check your Prismic setup.");
          setLoading(false);
          return;
        }

        const formattedProjects: Project[] = data.map((project) => {
          const images: GalleryImage[] = [];
          
          if (project.data?.slices && Array.isArray(project.data.slices)) {
            project.data.slices.forEach((slice) => {
              if (slice.slice_type === "single_photo" && slice.primary?.photo) {
                images.push({
                  image: {
                    url: slice.primary.photo.url,
                    alt: slice.primary.photo.alt || "",
                  },
                });
              }
            });
          }

          return {
            uid: project.uid,
            title: String(project.data?.title || "Untitled Project"),
            images,
          };
        });

        setProjects(formattedProjects);
      } catch {
        console.error("Failed to fetch gallery projects");
        setError("Failed to load gallery projects. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <ReactLenis root>
        <div className="h-screen flex items-center justify-center">
          <p>Loading gallery...</p>
        </div>
      </ReactLenis>
    );
  }

  if (error) {
    return (
      <ReactLenis root>
        <div className="h-screen flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-600 mb-2">{error}</p>
            <p className="text-sm text-gray-500">
              Make sure you&apos;ve published your Gallery Project documents in Prismic.
            </p>
          </div>
        </div>
      </ReactLenis>
    );
  }

  return (
    <ReactLenis root>
      <div className="h-screen max-w-screen relative">
        <NavBar />
        <div>
          <div className="flex flex-col space-y-10 h-content p-4">
            <div className="h-[25em] w-full flex items-end relative">
              <h1>GALLERY</h1>
            </div>
          </div>
          <div className="w-full mb-16">
            <div className="grid grid-row-auto">
              {projects.map((project, index) => (
                <div
                  onClick={() =>
                    setActiveProject(
                      activeProject?.uid === project.uid ? null : project
                    )
                  }
                  key={`project-${project.uid}`}
                  className="cursor-pointer">
                  {index === 0 && <div className="h-[2px] bg-black" />}
                  <ProjectRow
                    project={project}
                    isActive={activeProject?.uid === project.uid}
                  />
                  <ProjectDetails
                    project={project}
                    show={activeProject?.uid === project.uid}
                  />
                  <div className="h-[2px] bg-black" />
                </div>
              ))}
            </div>
          </div>
          <div className="p-4">
            <Footer />
          </div>
        </div>
      </div>
    </ReactLenis>
  );
}