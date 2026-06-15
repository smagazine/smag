"use client";
import Link from "next/link";
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
            <img src="https://picsum.photos/seed/saudimag-member/1200/800" alt="Editorial membership visual" />
          </div>
          <div className="container" style={{ display: "grid" }}>
            <div className="membership-card reveal">
              <span className="label eyebrow" data-en="Membership" data-ar="العضوية">Membership</span>
              <h1 data-en="Join the Reader's Majlis." data-ar="انضم إلى مجلس القراء.">
                Join the Reader&apos;s Majlis.
              </h1>
              <p className="deck" data-en="Curated intelligence, thoughtful access, and editorial depth for readers following the Gulf's cultural shift." data-ar="ذكاء انتقائي وعمق تحريري لقراء يتابعون التحول الثقافي في الخليج.">
                Curated intelligence, thoughtful access, and editorial depth for readers following the Gulf&apos;s cultural shift.
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
              <h3>Unrestricted Access</h3>
              <p>Unlimited reading across our digital archive, featuring long-form journalism and cultural commentary.</p>
            </div>
            <div className="benefit reveal">
              <span className="material-symbols-outlined">workspace_premium</span>
              <h3>Print Edition</h3>
              <p>A meticulously crafted print magazine delivered quarterly as a collectible editorial object.</p>
            </div>
            <div className="benefit reveal">
              <span className="material-symbols-outlined">confirmation_number</span>
              <h3>Curated Events</h3>
              <p>Priority invitations to private talks, cultural salons, and editorial gatherings.</p>
            </div>
          </div>
        </section>

        <section className="section soft" id="tiers">
          <div className="container">
            <div className="stats-row reveal">
              <div className="stat-item">
                <span className="stat-number">200+</span>
                <span className="stat-label">Stories Published</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">12K+</span>
                <span className="stat-label">Active Readers</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">4×</span>
                <span className="stat-label">Issues Per Year</span>
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
                  <h3>Digital</h3>
                  <span className="price">$15/month</span>
                  <ul>
                    <li>Unlimited digital articles</li>
                    <li>Daily briefing newsletter</li>
                    <li>Ad-free reading experience</li>
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
                  <h3>Print &amp; Digital</h3>
                  <span className="price">$45/month</span>
                  <ul>
                    <li>Everything in Digital</li>
                    <li>Quarterly print edition delivered</li>
                    <li>Exclusive digital supplements</li>
                    <li>Archival print access</li>
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
                  <h3>Majlis</h3>
                  <span className="price">Inquire</span>
                  <ul>
                    <li>Everything in Print &amp; Digital</li>
                    <li>Small-group editorial gatherings</li>
                    <li>Research notes and city briefings</li>
                    <li>Invitations to cultural dinners</li>
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
          <blockquote className="pullquote reveal">
            &ldquo;SAUDI MAG has redefined what it means to document our cultural renaissance. The print edition is a collector&apos;s item.&rdquo;
          </blockquote>
          <span className="label eyebrow">Nouf Al-Saud · Creative Director</span>
        </section>
      </main>

      <MembershipDialog ref={dialogRef} />
    </>
  );
}
