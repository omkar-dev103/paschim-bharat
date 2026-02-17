// src/app/(main)/about/page.tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  Target,
  Heart,
  Users,
  Award,
  Globe,
  Sparkles,
  Code,
  Database,
  Cloud,
  Palette,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const teamMembers = [
  {
    name: "Team Member 1",
    role: "Full Stack Developer",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Team Member 2",
    role: "UI/UX Designer",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Team Member 3",
    role: "Backend Developer",
    image: "https://randomuser.me/api/portraits/men/67.jpg",
  },
  {
    name: "Team Member 4",
    role: "Frontend Developer",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
  },
];

const techStack = [
  { name: "Next.js 14", icon: Code, color: "bg-black" },
  { name: "MongoDB Atlas", icon: Database, color: "bg-emerald-600" },
  { name: "Firebase Auth", icon: Cloud, color: "bg-amber-500" },
  { name: "Tailwind CSS", icon: Palette, color: "bg-cyan-500" },
];

export default function AboutPage() {
  const { ref: missionRef, isVisible: missionVisible } = useScrollAnimation();
  const { ref: teamRef, isVisible: teamVisible } = useScrollAnimation();
  const { ref: techRef, isVisible: techVisible } = useScrollAnimation();

  return (
    <div className="pt-24 pb-16">
      {/* Hero Section */}
      <div className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900 via-indigo-800 to-saffron-600" />
        <div className="absolute inset-0 opacity-20">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <div className="container-custom relative z-10 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full mb-8"
          >
            <Award className="w-5 h-5 text-saffron-400" />
            <span className="text-sm font-medium">
              IndiaSkills 2025-26 Competition Project
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl md:text-6xl font-bold mb-6"
          >
            About Paschim Bharat
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/80 max-w-3xl mx-auto"
          >
            A digital tourism platform designed to showcase the rich cultural
            heritage, breathtaking landscapes, and vibrant experiences of
            Western India.
          </motion.p>
        </div>
      </div>

      {/* Mission Section */}
      <section ref={missionRef} className="py-20 bg-white dark:bg-gray-900">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={missionVisible ? { opacity: 1, x: 0 } : {}}
            >
              <span className="inline-block px-4 py-1.5 bg-saffron-500/10 text-saffron-600 dark:text-saffron-400 rounded-full text-sm font-medium mb-4">
                Our Mission
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Boosting Local Tourism &
                <span className="gradient-text"> Businesses</span>
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-6">
                Paschim Bharat is more than just a tourism website. It's a
                comprehensive platform designed to connect travelers with
                authentic local experiences while supporting small businesses
                and preserving cultural heritage.
              </p>
              <div className="space-y-4">
                {[
                  {
                    icon: Globe,
                    title: "Promote Regional Tourism",
                    desc: "Showcase hidden gems of Western India",
                  },
                  {
                    icon: Heart,
                    title: "Support Local Businesses",
                    desc: "Connect travelers with local restaurants and services",
                  },
                  {
                    icon: Users,
                    title: "Preserve Culture",
                    desc: "Tell stories that matter and traditions that inspire",
                  },
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-saffron-500/10 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-6 h-6 text-saffron-500" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                        {item.title}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={missionVisible ? { opacity: 1, x: 0 } : {}}
              className="relative"
            >
              <div className="relative h-[500px] rounded-2xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800"
                  alt="India Gate"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              <Card
                variant="glass"
                className="absolute -bottom-6 -left-6 p-6 bg-white dark:bg-gray-900"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-saffron-500 rounded-xl flex items-center justify-center">
                    <Target className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">
                      4
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                      States Covered
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section
        ref={techRef}
        className="py-20 bg-gray-50 dark:bg-gray-950"
      >
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={techVisible ? { opacity: 1, y: 0 } : {}}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1.5 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-full text-sm font-medium mb-4">
              Technology Stack
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Built with Modern
              <span className="gradient-text"> Technologies</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Leveraging cutting-edge web technologies to deliver a fast,
              secure, and scalable tourism platform.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {techStack.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 20 }}
                animate={techVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1 }}
              >
                <Card variant="elevated" className="p-6 text-center card-hover">
                  <div
                    className={`w-16 h-16 ${tech.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}
                  >
                    <tech.icon className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    {tech.name}
                  </h4>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Full Tech List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={techVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="mt-12"
          >
            <Card variant="elevated" className="p-8">
              <h3 className="font-display text-xl font-semibold text-gray-900 dark:text-white mb-6 text-center">
                Complete Technology Stack
              </h3>
              <div className="flex flex-wrap justify-center gap-3">
                {[
                  "Next.js 14",
                  "React 18",
                  "TypeScript",
                  "Tailwind CSS",
                  "Framer Motion",
                  "MongoDB Atlas",
                  "Firebase Auth",
                  "Cloudinary",
                  "Zustand",
                  "React Hot Toast",
                  "Lucide Icons",
                  "Vercel",
                ].map((tech) => (
                  <span
                    key={tech}
                    className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-gray-700 dark:text-gray-300 text-sm font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section ref={teamRef} className="py-20 bg-white dark:bg-gray-900">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={teamVisible ? { opacity: 1, y: 0 } : {}}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-full text-sm font-medium mb-4">
              Our Team
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Meet the <span className="gradient-text">Creators</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              A passionate team of developers and designers working together
              to create an exceptional tourism experience.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                animate={teamVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1 }}
              >
                <Card variant="elevated" className="p-6 text-center card-hover">
                  <div className="relative w-32 h-32 mx-auto mb-4">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover rounded-full border-4 border-saffron-500"
                    />
                  </div>
                  <h4 className="font-display font-semibold text-lg text-gray-900 dark:text-white mb-1">
                    {member.name}
                  </h4>
                  <p className="text-saffron-500 text-sm font-medium">
                    {member.role}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Statement */}
      <section className="py-20 bg-gradient-to-r from-indigo-900 via-indigo-800 to-saffron-600 text-white">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <Sparkles className="w-12 h-12 text-saffron-400 mx-auto mb-6" />
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-6 max-w-4xl mx-auto">
              "Empowering local tourism and preserving the cultural heritage
              of Western India through technology"
            </h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              — IndiaSkills 2025-26 Competition Project
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}