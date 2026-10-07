'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { EASE, fadeUp, staggerParent } from './motionShared';
import SectionHeading from './SectionHeading';

const AboutUs = () => {
  return (
    <section
      id="who-we-are"
      aria-labelledby="who-we-are-title"
      className="relative w-full border-t border-[#E5E7EB] bg-[#F8FAFC]/70"
    >
      {/* Mirror of the Community section: copy on the left, photo bleeding to
          the right viewport edge. Stacks photo-over-copy below lg. */}
      <div className="grid grid-cols-1 items-stretch lg:grid-cols-[minmax(0,45%)_minmax(0,55%)]">
        {/* Copy */}
        <div className="order-2 flex items-center px-5 py-14 sm:px-8 lg:order-1 lg:px-12 lg:py-20 xl:px-16">
          <div className="max-w-xl lg:ml-auto">
            <SectionHeading
              title="A trusted partner in Philippine healthcare since 2005"
              titleId="who-we-are-title"
            />

            <motion.div
              className="mt-6 space-y-5 leading-relaxed text-[#1F2937]"
              style={{ fontSize: 'clamp(0.95rem, 1.4vw, 1.075rem)' }}
              variants={staggerParent}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <motion.p variants={fadeUp}>
                Founded on <span className="font-semibold text-[#22409A]">September 21, 2005</span>,
                Biosite Medical Instruments, Inc. (BMI) is a Philippine-based,
                ISO&nbsp;9001:2015&#8209;certified healthcare company. For twenty-one years we have
                been a trusted partner to hospitals, laboratories, and healthcare institutions across
                the country.
              </motion.p>
              <motion.p variants={fadeUp}>
                We specialize in the importation and distribution of high-quality diagnostic
                instruments, laboratory and medical supplies, medical equipment, and imaging
                solutions — enabling accurate diagnostics, operational efficiency, and improved
                patient outcomes nationwide.
              </motion.p>
              <motion.p variants={fadeUp} className="border-l-2 border-[#EE232E] pl-4 text-[#111827]">
                More than a supplier, we work alongside healthcare professionals to strengthen
                clinical capabilities and elevate standards of care —{' '}
                <span className="font-semibold italic">because every life deserves the best care.</span>
              </motion.p>
            </motion.div>
          </div>
        </div>

        {/* Photo — full-bleed right, square corners, no container inset. */}
        <motion.div
          className="relative order-1 min-h-[300px] sm:min-h-[380px] lg:order-2 lg:min-h-[600px]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          <Image
            src="https://res.cloudinary.com/dmvyhrewy/image/upload/w_1400,q_auto,f_auto/v1763530574/biosite-assets/Screenshot_2025-10-03_102205.png"
            alt="Biosite Medical Instruments headquarters"
            fill
            loading="lazy"
            sizes="(max-width: 1024px) 100vw, 55vw"
            className="object-cover object-center"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default AboutUs;
