"use client";
import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import MembershipDialog, { type MembershipDialogHandle } from "@/components/MembershipDialog";

export default function SubscribePage() {
  const dialogRef = useRef<MembershipDialogHandle>(null);

  const selectTier = (tier: string) => dialogRef.current?.open(tier);

  return (
    <>
      <main className="page" id="main-content">
        <section className="subscription-hero">
          <div className="image-frame reveal">
            <Image fill priority src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=1200&h=800&fit=crop&auto=format" alt="Editorial membership visual" sizes="100vw" />
          </div>
          <div className="container d-grid">
            <div className="membership-card reveal">
              <span className="label eyebrow" data-en="Membership" data-ar="العضوية">Membership</span>
              <h1 data-en="Join the Reader's Majlis." data-ar="انضم إلى مجلس القراء.">
                Join the Reader&apos;s Majlis.
              </h1>
              <p className="deck" data-en="Curated intelligence, thoughtful access, and editorial depth for readers following Saudi Arabia's cultural shift." data-ar="ذكاء انتقائي وعمق تحريري لقراء يتابعون التحول الثقافي في السعودية.">
                Curated intelligence, thoughtful access, and editorial depth for readers following Saudi Arabia&apos;s cultural shift.
              </p>
              <p className="mt-lg">
                <a className="button" href="#tiers" data-en="View membership tiers" data-ar="عرض مستويات العضوية">
                  View membership tiers
                </a>
              </p>
            </div>
          </div>
        </section>

        <section className="section container">
          <div className="benefits">
            <div className="benefit reveal">
              <span className="material-symbols-outlined">auto_stories</span>
              <h3 data-en="Unrestricted Access" data-ar="وصول غير محدود">Unrestricted Access</h3>
              <p data-en="Unlimited reading across our digital archive, featuring long-form journalism and cultural commentary." data-ar="قراءة غير محدودة عبر أرشيفنا الرقمي، يتضمن الصحافة المطوّلة والتعليق الثقافي.">Unlimited reading across our digital archive, featuring long-form journalism and cultural commentary.</p>
            </div>
            <div className="benefit reveal">
              <span className="material-symbols-outlined">workspace_premium</span>
              <h3 data-en="Print Edition" data-ar="النسخة المطبوعة">Print Edition</h3>
              <p data-en="A meticulously crafted print magazine delivered quarterly as a collectible editorial object." data-ar="مجلة مطبوعة مصنوعة بعناية تُسلَّم فصلياً كقطعة تحريرية للاقتناء.">A meticulously crafted print magazine delivered quarterly as a collectible editorial object.</p>
            </div>
            <div className="benefit reveal">
              <span className="material-symbols-outlined">confirmation_number</span>
              <h3 data-en="Curated Events" data-ar="فعاليات منتقاة">Curated Events</h3>
              <p data-en="Priority invitations to private talks, cultural salons, and editorial gatherings." data-ar="دعوات ذات أولوية إلى المحادثات الخاصة والصالونات الثقافية والتجمعات التحريرية.">Priority invitations to private talks, cultural salons, and editorial gatherings.</p>
            </div>
          </div>
        </section>

        <section className="section soft" id="tiers">
          <div className="container">
            <div className="stats-row reveal">
              <div className="stat-item">
                <span className="stat-number">200+</span>
                <span className="stat-label" data-en="Stories Published" data-ar="قصة منشورة">Stories Published</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">12K+</span>
                <span className="stat-label" data-en="Active Readers" data-ar="قارئ نشط">Active Readers</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">4×</span>
                <span className="stat-label" data-en="Issues Per Year" data-ar="عدد سنوياً">Issues Per Year</span>
              </div>
            </div>
            <div className="section-header reveal">
              <div>
                <span className="label eyebrow" data-en="Membership" data-ar="العضوية">Membership</span>
                <h2 data-en="Select Your Tier" data-ar="اختر مستواك">Select Your Tier</h2>
              </div>
            </div>
            <div className="tiers">
              <article className="tier reveal">
                <div>
                  <span className="meta" data-en="Essential" data-ar="أساسي">Essential</span>
                  <h3 data-en="Digital" data-ar="رقمي">Digital</h3>
                  <span className="price">$15/month</span>
                  <ul>
                    <li data-en="Unlimited digital articles" data-ar="مقالات رقمية غير محدودة">Unlimited digital articles</li>
                    <li data-en="Daily briefing newsletter" data-ar="نشرة إخبارية يومية">Daily briefing newsletter</li>
                    <li data-en="Ad-free reading experience" data-ar="تجربة قراءة بدون إعلانات">Ad-free reading experience</li>
                  </ul>
                </div>
                <button
                  className="button secondary"
                  type="button"
                  onClick={() => selectTier("Digital")}
                  data-en="Select Digital"
                  data-ar="اختر الرقمي"
                >
                  Select Digital
                </button>
              </article>
              <article className="tier featured reveal">
                <div>
                  <span className="meta" data-en="Complete" data-ar="شامل">Complete</span>
                  <h3 data-en="Print & Digital" data-ar="مطبوع ورقمي">Print &amp; Digital</h3>
                  <span className="price">$45/month</span>
                  <ul>
                    <li data-en="Everything in Digital" data-ar="كل ما في الرقمي">Everything in Digital</li>
                    <li data-en="Quarterly print edition delivered" data-ar="النسخة المطبوعة الفصلية تُسلَّم">Quarterly print edition delivered</li>
                    <li data-en="Exclusive digital supplements" data-ar="ملاحق رقمية حصرية">Exclusive digital supplements</li>
                    <li data-en="Archival print access" data-ar="الوصول إلى الأرشيف المطبوع">Archival print access</li>
                  </ul>
                </div>
                <button
                  className="button"
                  type="button"
                  onClick={() => selectTier("Print & Digital")}
                  data-en="Select Print & Digital"
                  data-ar="اختر المطبوع والرقمي"
                >
                  Select Print &amp; Digital
                </button>
              </article>
              <article className="tier reveal">
                <div>
                  <span className="meta" data-en="Community" data-ar="مجتمع">Community</span>
                  <h3 data-en="Majlis" data-ar="مجلس">Majlis</h3>
                  <span className="price" data-en="Inquire" data-ar="استفسر">Inquire</span>
                  <ul>
                    <li data-en="Everything in Print & Digital" data-ar="كل ما في المطبوع والرقمي">Everything in Print &amp; Digital</li>
                    <li data-en="Small-group editorial gatherings" data-ar="تجمعات تحريرية في مجموعات صغيرة">Small-group editorial gatherings</li>
                    <li data-en="Research notes and city briefings" data-ar="ملاحظات البحث وإحاطات المدن">Research notes and city briefings</li>
                    <li data-en="Invitations to cultural dinners" data-ar="دعوات لحفلات العشاء الثقافية">Invitations to cultural dinners</li>
                  </ul>
                </div>
                <Link className="button secondary" href="/contact" data-en="Request invitation" data-ar="طلب دعوة">
                  Request invitation
                </Link>
              </article>
            </div>
          </div>
        </section>

        <section className="section container text-center">
          <blockquote className="pullquote reveal" data-en="&ldquo;SAUDI MAG has redefined what it means to document our cultural renaissance. The print edition is a collector's item.&rdquo;" data-ar="&ldquo;أعادت SAUDI MAG تعريف معنى توثيق نهضتنا الثقافية. النسخة المطبوعة قطعة للاقتناء.&rdquo;">
            &ldquo;SAUDI MAG has redefined what it means to document our cultural renaissance. The print edition is a collector&apos;s item.&rdquo;
          </blockquote>
          <span className="label eyebrow" data-en="Nouf Al-Saud · Creative Director" data-ar="نوف آل سعود · المديرة الإبداعية">Nouf Al-Saud · Creative Director</span>
        </section>
      </main>

      <MembershipDialog ref={dialogRef} />
    </>
  );
}
