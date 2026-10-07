'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { EASE, fadeUp, staggerParent } from './motionShared';
import SectionHeading from './SectionHeading';

const Community = () => {
  return (
    <section
      id="community"
      aria-labelledby="community-title"
      className="relative border-t border-[#E5E7EB] bg-[#F8FAFC]/70"
    >
      {/* Asymmetric split: the photo bleeds to the left viewport edge, the copy
          sits in the right column. Stacks image-over-copy below lg. */}
      <div className="grid grid-cols-1 items-stretch lg:grid-cols-[minmax(0,55%)_minmax(0,45%)]">
        {/* Photo — full-bleed left, square corners, no container inset. */}
        <motion.div
          className="relative min-h-[300px] sm:min-h-[380px] lg:min-h-[600px]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          <Image
            src="/asset/outreach.png"
            alt="Biosite Medical Instruments Cares community outreach with children and families"
            fill
            loading="lazy"
            sizes="(max-width: 1024px) 100vw, 55vw"
            className="object-cover object-center"
          />
        </motion.div>

        {/* Copy */}
        <div className="flex items-center px-5 py-14 sm:px-8 lg:px-12 lg:py-20 xl:px-16">
          <div className="max-w-xl">
            <SectionHeading title="BMI Cares" titleId="community-title" />

            <motion.div
              className="mt-6 space-y-5 leading-relaxed text-[#1F2937]"
              style={{ fontSize: 'clamp(0.95rem, 1.4vw, 1.075rem)' }}
              variants={staggerParent}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <motion.p variants={fadeUp}>
                Through the{' '}
                <span className="font-semibold text-[#22409A]">Biosite Medical Instruments, Inc. Cares</span>{' '}
                initiative, the company extended help to the community by providing support and sharing
                meaningful moments with children and families in need. This outreach reflects Biosite&apos;s
                commitment to compassion and service — helping others through genuine care and kindness.
              </motion.p>
              <motion.p variants={fadeUp}>
                These efforts are deeply aligned with the company&apos;s guiding principle,{' '}
                <span className="font-semibold italic text-[#111827]">
                  &ldquo;Because Every Life Deserves the Best Care.&rdquo;
                </span>{' '}
                By reaching beyond its role as a medical instruments provider and offering support where it
                is most needed, Biosite continues to live out its mission of caring for lives and
                strengthening communities.
              </motion.p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Community;
