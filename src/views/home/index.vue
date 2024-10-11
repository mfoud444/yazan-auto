<script lang="ts" setup>
import Hero from './Hero.vue'
import Navbar from './Navbar.vue'
import Carousel from './Carousel.vue'
import Company from './Company.vue'
import News from './News.vue'
import Features from './Features.vue'

import { Footer } from '@/components/common';
import { MainHeader } from '@/components/common';
</script>

<template>
    <!-- <div class="background">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div>
        <div
      style="width: 100vw; min-height: 100vh; position: fixed; z-index: -1; display: flex; justify-content: center; padding: 120px 24px 160px 24px; pointer-events: none;">
      <div
        style="background: radial-gradient(circle, rgba(2, 0, 36, 0) 0, #fafafa 100%); position: absolute; content: ''; z-index: 2; width: 100%; height: 100%; top: 0;">
      </div>
      <div class="bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045]"></div>
      <div
        style="z-index: 3; width: 100%; max-width: 640px; background-image: radial-gradient(at 27% 37%, hsla(215, 98%, 61%, 1) 0px, transparent 0%), radial-gradient(at 97% 21%, hsla(125, 98%, 72%, 1) 0px, transparent 50%), radial-gradient(at 52% 99%, hsla(354, 98%, 61%, 1) 0px, transparent 50%), radial-gradient(at 10% 29%, hsla(256, 96%, 67%, 1) 0px, transparent 50%), radial-gradient(at 97% 96%, hsla(38, 60%, 74%, 1) 0px, transparent 50%), radial-gradient(at 33% 50%, hsla(222, 67%, 73%, 1) 0px, transparent 50%), radial-gradient(at 79% 53%, hsla(343, 68%, 79%, 1) 0px, transparent 50%); position: absolute; height: 100%; filter: blur(100px) saturate(150%); top: 80px; opacity: 0.15;">
      </div>
    </div>
    <div style="background: #bb9ce6;background: -webkit-linear-gradient(151deg, #bb9ce6 0%, #ddd4e9 100%);background: linear-gradient(151deg, #bb9ce6 0%, #ddd4e9 100%);"></div> -->
 
    <div class="sticky top-0 z-50 container">
     <MainHeader/>
      <!-- <Navbar /> -->
    </div>
      <div class="w-full h-full container overflow-x-hidden flex flex-col gap-4 dark:bg-gray-950">
       
        <Hero/>


 



    <!-- Features Section -->
    <section class="py-20 mt-20">
        <div class="container mx-auto">
            <h2 class="text-3xl font-bold text-center mb-12 text-instagram-purple">Our Features</h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div class="bg-white p-6 rounded-lg shadow-md">
                    <h3 class="text-xl font-semibold mb-4 text-instagram-pink">Auto Posting</h3>
                    <p class="text-gray-600">Schedule and automatically post your content at optimal times for maximum engagement.</p>
                </div>
                <div class="bg-white p-6 rounded-lg shadow-md">
                    <h3 class="text-xl font-semibold mb-4 text-instagram-orange">Follower Growth</h3>
                    <p class="text-gray-600">Organically grow your followers with our smart targeting and engagement strategies.</p>
                </div>
                <div class="bg-white p-6 rounded-lg shadow-md">
                    <h3 class="text-xl font-semibold mb-4 text-instagram-yellow">Analytics Dashboard</h3>
                    <p class="text-gray-600">Track your growth and engagement with our comprehensive analytics dashboard.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Pricing Section -->
    <section class="py-12">
        <div class="container mx-auto">
            <h2 class="text-3xl font-bold text-center mb-12 text-instagram-purple">Pricing Plans</h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div class="bg-white p-8 rounded-lg shadow-md border border-instagram-pink">
                    <h3 class="text-2xl font-semibold mb-4 text-instagram-pink">Basic</h3>
                    <p class="text-4xl font-bold mb-6">$29<span class="text-sm font-normal">/month</span></p>
                    <ul class="mb-6">
                        <li class="mb-2">✅ Auto Posting</li>
                        <li class="mb-2">✅ 1000 Followers/month</li>
                        <li class="mb-2">✅ Basic Analytics</li>
                    </ul>
                    <a href="/admin" class="block text-center bg-instagram-pink text-white font-bold py-2 px-4 rounded-full hover:bg-instagram-purple transition duration-300">Choose Plan</a>
                </div>
                <div class="bg-white p-8 rounded-lg shadow-md border border-instagram-purple">
                    <h3 class="text-2xl font-semibold mb-4 text-instagram-purple">Pro</h3>
                    <p class="text-4xl font-bold mb-6">$79<span class="text-sm font-normal">/month</span></p>
                    <ul class="mb-6">
                        <li class="mb-2">✅ All Basic Features</li>
                        <li class="mb-2">✅ 5000 Followers/month</li>
                        <li class="mb-2">✅ Advanced Analytics</li>
                        <li class="mb-2">✅ Priority Support</li>
                    </ul>
                    <a href="/admin" class="block text-center bg-instagram-purple text-white font-bold py-2 px-4 rounded-full hover:bg-instagram-pink transition duration-300">Choose Plan</a>
                </div>
                <div class="bg-white p-8 rounded-lg shadow-md border border-instagram-orange">
                    <h3 class="text-2xl font-semibold mb-4 text-instagram-orange">Enterprise</h3>
                    <p class="text-4xl font-bold mb-6">$199<span class="text-sm font-normal">/month</span></p>
                    <ul class="mb-6">
                        <li class="mb-2">✅ All Pro Features</li>
                        <li class="mb-2">✅ Unlimited Growth</li>
                        <li class="mb-2">✅ Custom Strategies</li>
                        <li class="mb-2">✅ Dedicated Account Manager</li>
                    </ul>
                    <a href="/admin" class="block text-center bg-instagram-orange text-white font-bold py-2 px-4 rounded-full hover:bg-instagram-yellow transition duration-300">Choose Plan</a>
                </div>
            </div>
        </div>
    </section>

    <!-- Testimonials Section -->
    <section class="py-20 rounded-lg bg-gradient-to-r from-instagram-yellow via-instagram-orange to-instagram-pink">
        <div class="container mx-auto">
            <h2 class="text-3xl font-bold text-center mb-12 text-white">What Our Clients Say</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div class="bg-white p-6 rounded-lg shadow-md">
                    <p class="text-gray-600 mb-4">"Yazan COM has transformed my Instagram presence. My followers and engagement have skyrocketed!"</p>
                    <p class="font-semibold text-instagram-purple">- Mohammed Foud., Influencer</p>
                </div>
                <div class="bg-white p-6 rounded-lg shadow-md">
                    <p class="text-gray-600 mb-4">"The analytics provided by Yazan COM have been invaluable for growing my business on Instagram."</p>
                    <p class="font-semibold text-instagram-pink">- Taha Khalid., Small Business Owner</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Call to Action Section -->
    <section class="py-20 bg-instagram-purple mb-20 rounded-lg">
        <div class="container mx-auto text-center">
            <h2 class="text-3xl font-bold mb-4 text-white">Ready to Supercharge Your Instagram?</h2>
            <p class="text-xl mb-8 text-white">Join thousands of satisfied users and start growing your Instagram today!</p>
            <a href="/admin" class="bg-white text-instagram-purple font-bold py-2 px-4 rounded-full hover:bg-instagram-yellow hover:text-white transition duration-300">Start Your Free Trial</a>
        </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-800 text-white py-8">
        <div class="container mx-auto text-center">
            <p>&copy; 2023 InstaAutomate. All rights reserved.</p>
        </div>
    </footer>

        <!-- <Company/> -->
        <!-- <Features/> -->
        <!-- <Carousel/> -->
    <!-- <News/> -->
      </div>



    <!-- <CustomerReview/> -->
   
    <!-- <Footer/> -->
 
</template>
