'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import VehicleForm from '../forms/VehicleForm';

const featureData = {
  'Maruti Alto K10': {
    Exterior: [
      {
        title: 'Honeycomb grille',
        image:
          'https://ik.imagekit.io/hsukyjske/Nivya-automobiles/Headlights_desk.avif?updatedAt=1762258483503',
        description:
          'Design gives your Alto K10 a contemporary look, making every drive stand out.',
      },
      {
        title: 'Peppy headlamps',
        image:
          'https://ik.imagekit.io/hsukyjske/Nivya-automobiles/grill_desk.avif?updatedAt=1762258483460',
        description:
          'Provide better visibility, keeping you safe and focused on the road ahead.',
      },
      {
        title: 'Trendy rear combination lamps',
        image:
          'https://ik.imagekit.io/hsukyjske/Nivya-automobiles/Alto-k10/Exterior/Tailight_desk.avif?updatedAt=1762316116964',
        description:
          'Ensure other drivers see you clearly in any weather condition.',
      },
      {
        title: 'Bold Front Fascia',
        image:
          'https://ik.imagekit.io/hsukyjske/Nivya-automobiles/Alto-k10/Exterior/Centre_desk.avif?updatedAt=1762316117027',
        description: 'Gives a commanding presence, ready for every adventure.',
      },
      {
        title: '13’’ wheels with honeycombed-themed covers',
        image:
          'https://ik.imagekit.io/hsukyjske/Nivya-automobiles/Alto-k10/Exterior/Wheel_Desk.avif?updatedAt=1762316116964',
        description: 'Offers a contemporary design with superior grip.',
      },
      {
        title: 'Reverse parking sensor',
        image:
          'https://ik.imagekit.io/hsukyjske/Nivya-automobiles/Alto-k10/Exterior/Parking_sensor_desk.avif?updatedAt=1762316116985',
        description:
          'Takes the stress out of manoeuvring and reduces parking time.',
      },
    ],
    Interiors: [
      {
        title: 'Lively and smart interiors',
        image:
          'https://ik.imagekit.io/hsukyjske/Nivya-automobiles/Alto-k10/Interior/Cabin_desk.avif?updatedAt=1762319771938',
        description:
          'Make every journey comfortable with ample legroom and headroom.',
      },
      {
        title: 'Steering-mounted audio and voice control',
        image:
          'https://ik.imagekit.io/hsukyjske/Nivya-automobiles/Alto-k10/Interior/steering_mounted_desk.avif?updatedAt=1762319772080',
        description: 'Let you manage music and calls hands-free.',
      },
      {
        title: 'Speedometer with digital display',
        image:
          'https://ik.imagekit.io/hsukyjske/Nivya-automobiles/Alto-k10/Interior/Speedometer_desk.avif?updatedAt=1762319772116',
        description:
          'Keeps you informed, giving full control behind the wheel.',
      },
      {
        title: 'Smartplay Studio with Smartphone Navigation',
        image:
          'https://ik.imagekit.io/hsukyjske/Nivya-automobiles/Alto-k10/Interior/Infotainement_desk.avif?updatedAt=1762319772082',
        description:
          'With smart integration to access media, maps and other features.',
      },
      {
        title: 'Auto Gear Shift Technology',
        image:
          'https://ik.imagekit.io/hsukyjske/Nivya-automobiles/Alto-k10/Interior/AGS_desk.avif?updatedAt=1762319772081',
        description:
          'To drive with the ease and efficiency of a manual, especially in city traffic.',
      },
    ],
  },
  'Maruti Swift': {
    Exterior: [
      {
        title: 'Sporty Front Bumper',
        image:
          'https://images-saboomaruti-in.s3.ap-south-1.amazonaws.com/Arena/swift/exterior1.webp',
        description: 'Aggressive styling for a bold look.',
      },
    ],
    Interiors: [
      {
        title: 'SmartPlay Infotainment System',
        image:
          'https://images-saboomaruti-in.s3.ap-south-1.amazonaws.com/Arena/swift/interior1.webp',
        description: 'Seamless connectivity and entertainment.',
      },
    ],
  },
  'Maruti S-Presso': {
    Exterior: [
      {
        title: 'Signature C-shaped tail lamps',
        image:
          'https://ik.imagekit.io/hsukyjske/Nivya-automobiles/s-presso/Exterior/Taillight_Desktop.avif?updatedAt=1762321003418',
        description:
          'Stand out with unique LED lighting for a recognizable look.',
      },
      {
        title: 'Twin chamber headlamps',
        image:
          'https://ik.imagekit.io/hsukyjske/Nivya-automobiles/s-presso/Exterior/Headlight_Desktop.avif?updatedAt=1762321003756',
        description:
          'Offer a stylish, modern design that shines bright with youthful energy.',
      },
      {
        title: 'Squarish wheel arches with 14-inch tyres',
        image:
          'https://ik.imagekit.io/hsukyjske/Nivya-automobiles/s-presso/Exterior/Wheel_Desktop.avif?updatedAt=1762321003825',
        description: 'Offer a confident stance and balanced proportions.',
      },
      {
        title: 'Electrically adjustable ORVMs',
        image:
          'https://ik.imagekit.io/hsukyjske/Nivya-automobiles/s-presso/Exterior/ORVM_Desktop.avif?updatedAt=1762321003885',
        description:
          'Provide easy adjustments for clear visibility on every drive.',
      },
      {
        title: 'SUV-inspired bold front fascia',
        image:
          'https://ik.imagekit.io/hsukyjske/Nivya-automobiles/s-presso/Exterior/Centre_Desktop.avif?updatedAt=1762321003846',
        description: 'Gives a commanding presence, ready for every adventure.',
      },
    ],
    Interiors: [
      {
        title: 'Large cabin space and best in class rear legroom',
        image:
          'https://ik.imagekit.io/hsukyjske/Nivya-automobiles/s-presso/Interior/Backseat_image_desk.avif?updatedAt=1762321973303',
        description: 'Offers convenience and unmatched comfort.',
      },
      {
        title: 'Wide and spacious 239 L boot space',
        image:
          'https://ik.imagekit.io/hsukyjske/Nivya-automobiles/s-presso/Interior/Bootspace_image_desk.avif?updatedAt=1762321972772',
        description:
          'Offers generous storage andlets you pack more for every journey.',
      },
      {
        title: 'Front and rear utility spaces',
        image:
          'https://ik.imagekit.io/hsukyjske/Nivya-automobiles/s-presso/Interior/cabin_image_desk.avif?updatedAt=1762321973277',
        description:
          'To keep essentials within reach, ensuring a clutter-free ride.',
      },
      {
        title: 'Dynamic centre console with SmartPlay Studio',
        image:
          'https://ik.imagekit.io/hsukyjske/Nivya-automobiles/s-presso/Interior/smartplay_desk_image.avif?updatedAt=1762321972829',
        description: 'Keeps you connected and focused on every drive.',
      },
      {
        title: 'Steering-Mounted Audio and Voice Controls',
        image:
          'https://ik.imagekit.io/hsukyjske/Nivya-automobiles/s-presso/Interior/steering_desk_image.avif?updatedAt=1762321973291',
        description:
          'To access calls and features without taking your hands off the steering.',
      },
    ],
  },
  'Maruti Celerio': {
    Exterior: [
      {
        title: '3D organic sculpted design',
        image:
          'https://ik.imagekit.io/hsukyjske/Nivya-automobiles/celerio/Exterior/Center_desktop_img.avif?updatedAt=1762323428353',
        description: 'Gives a new look with dynamic curves and flowing lines.',
      },
      {
        title: 'R15 (38.02 cm) urbane black alloy wheels',
        image:
          'https://ik.imagekit.io/hsukyjske/Nivya-automobiles/celerio/Exterior/wheel_img.avif?updatedAt=1762323427827',
        description:
          'Enhance handling, acceleration, and style, making your Celerio stand out.',
      },
      {
        title: 'The radiant grille with sharp chrome accents',
        image:
          'https://ik.imagekit.io/hsukyjske/Nivya-automobiles/celerio/Exterior/grill_desktop_img.avif?updatedAt=1762323428263',
        description: 'Creates a bold first impression on every city drive.',
      },
      {
        title: 'Droplet styled tail lamps',
        image:
          'https://ik.imagekit.io/hsukyjske/Nivya-automobiles/celerio/Exterior/Taillight_desktop_img.avif?updatedAt=1762323427927',
        description: 'Stand-out and add a touch of trendy charm.',
      },
      {
        title: 'Electrically foldable orvms',
        image:
          'https://ik.imagekit.io/hsukyjske/Nivya-automobiles/celerio/Exterior/ORVM_desktop_img.avif?updatedAt=1762323428357',
        description:
          'With turn indicators adjust easily to prevent damage while parking.',
      },
    ],
    Interiors: [
      {
        title: 'Stereoscopic instrument cluster',
        image:
          'https://ik.imagekit.io/hsukyjske/Nivya-automobiles/s-presso/Interior/Backseat_image_desk.avif?updatedAt=1762321973303',
        description:
          'Offers a well-structured layout for clear, distraction-free info.',
      },
      {
        title: 'Premium all-black interiors',
        image:
          'https://ik.imagekit.io/hsukyjske/Nivya-automobiles/celerio/Interior/dashboard_desktop_img.avif?updatedAt=1762323489164',
        description:
          'Create a youthful, energetic vibe to enhance your city adventures.',
      },
      {
        title: 'Contemporary dashboard',
        image:
          'https://ik.imagekit.io/hsukyjske/Nivya-automobiles/celerio/Interior/infotainment_desktop_img.avif?updatedAt=1762323489660',
        description:
          'Features a clean design and intuitive layout for effortless access.',
      },
      {
        title: 'Energetic and spacious cabin',
        image:
          'https://ik.imagekit.io/hsukyjske/Nivya-automobiles/celerio/Interior/cabin_desktop_img.avif?updatedAt=1762323489142',
        description: 'Offers ample legroom, headroom, and a 292L boot space.',
      },
    ],
  },
  'Maruti WagonR': {
    Exterior: [
      {
        title: 'Wide Stance and Robust Design Language',
        image:
          'https://ik.imagekit.io/hsukyjske/Nivya-automobiles/WagonR/Exterior/centre_desk.avif?updatedAt=1762324853559',
        description: 'Make it bold, sturdy, and strikingly attractive.',
      },
      {
        title: 'Floating Roof Design',
        image:
          'https://ik.imagekit.io/hsukyjske/Nivya-automobiles/WagonR/Exterior/roof_desk.avif?updatedAt=1762324853618',
        description:
          'Adds a dynamic two-tone effect, elevating your style and presence.',
      },
      {
        title: 'Dynamic Alloy Wheels',
        image:
          'https://ik.imagekit.io/hsukyjske/Nivya-automobiles/WagonR/Exterior/wheel_desk.avif?updatedAt=1762324853630',
        description:
          'Enhance style, durability, and handling for a sporty drive.',
      },
      {
        title: 'Electrical Retractable ORVMs',
        image:
          'https://ik.imagekit.io/hsukyjske/Nivya-automobiles/WagonR/Exterior/ORVM_desk.avif?updatedAt=1762324853596',
        description:
          'Can be adjusted, reducing the risk of damage while parking.',
      },
      {
        title: 'Unique Dual Split Headlamps',
        image:
          'https://ik.imagekit.io/hsukyjske/Nivya-automobiles/WagonR/Exterior/headlight_desk.avif?updatedAt=1762324853546',
        description:
          'With DRLs ensure clear visibility and safety in all conditions.',
      },
    ],
    Interiors: [
      {
        title: 'Tall Boy Design and Spacious Cabin',
        image:
          'https://ik.imagekit.io/hsukyjske/Nivya-automobiles/WagonR/Interior/spacious_cabin.avif?updatedAt=1762324881212',
        description: 'Offer generous legroom and ample headroom for comfort.',
      },
      {
        title: '17.78cm Smartplay Studio with Smart Navigation and 4 Speakers',
        image:
          'https://ik.imagekit.io/hsukyjske/Nivya-automobiles/WagonR/Interior/smartplay_audio_desk.avif?updatedAt=1762324881338',
        description: 'Keeps you entertained on the go.',
      },
      {
        title: 'Dual-tone interiors',
        image:
          'https://ik.imagekit.io/hsukyjske/Nivya-automobiles/WagonR/Interior/dual_tone_desk.avif?updatedAt=1762324881100',
        description:
          'Add refined elegance, creating a serene and stylish driving experience.',
      },
      {
        title: 'Steering-Mounted Controls',
        image:
          'https://ik.imagekit.io/hsukyjske/Nivya-automobiles/WagonR/Interior/Steering_desk.avif?updatedAt=1762324881169',
        description:
          'Let you manage music, calls, and features without distractions.',
      },
      {
        title: '355 L Boot Space',
        image:
          'https://ik.imagekit.io/hsukyjske/Nivya-automobiles/WagonR/Interior/Bootspace_desk.avif?updatedAt=1762324880671',
        description:
          'Offers ample storage, ensuring you can pack more for every journey.',
      },
    ],
  },
  'Maruti Eeco': {
    Exterior: [
      {
        title: 'Stylish Clear Lens Headlamps',
        image:
          'https://ik.imagekit.io/hsukyjske/Nivya-automobiles/Eeco/Exterior/headlamp_desk.avif?updatedAt=1762326213847',
        description: 'Enhance visibility while adding a modern touch.',
      },
      {
        title: 'Exciting New Colours',
        image:
          'https://ik.imagekit.io/hsukyjske/Nivya-automobiles/Eeco/Exterior/exiting_new_color_desk.avif?updatedAt=1762326213727',
        description:
          'Let you express your personality with a palette of 5 vibrant shades.',
      },
      {
        title: 'Outside Rear View Mirror',
        image:
          'https://ik.imagekit.io/hsukyjske/Nivya-automobiles/Eeco/Exterior/exiting_new_color_desk.avif?updatedAt=1762326213727',
        description:
          'Helps you manoeuvre with confidence by giving a clear rear view.',
      },
      {
        title: 'Front Mud Flaps',
        image:
          'https://ik.imagekit.io/hsukyjske/Nivya-automobiles/Eeco/Exterior/mud_flap_desk.avif?updatedAt=1762326214295',
        description:
          'Protect Eeco’s underbody from damage while preventing dirt accumulation.',
      },
      {
        title: 'Stylish Clear Lens Tail Lamps',
        image:
          'https://ik.imagekit.io/hsukyjske/Nivya-automobiles/Eeco/Exterior/Tailight_desk.avif?updatedAt=1762326214346',
        description: 'Enhance visibility while adding a modern touch.',
      },
    ],
    Interiors: [
      {
        title: '5- and 6-Seater Options',
        image:
          'https://ik.imagekit.io/hsukyjske/Nivya-automobiles/Eeco/Interior/5_6_seat_desk.avif?updatedAt=1762326189005',
        description:
          'Offer ample space for passengers and smart storage for every adventure.',
      },
      {
        title: 'Large boot space',
        image:
          'https://ik.imagekit.io/hsukyjske/Nivya-automobiles/Eeco/Interior/bootspace_desk%20(1).avif?updatedAt=1762326188589',
        description: 'Gives ample storage for all your travel essentials.',
      },
      {
        title: 'Spacious Cabin',
        image:
          'https://ik.imagekit.io/hsukyjske/Nivya-automobiles/Eeco/Interior/spacious_cabin_desk.avif?updatedAt=1762326188451',
        description:
          'Offers generous legroom and ample headroom for ultimate comfort.',
      },
      {
        title: 'Air Conditioner with Heater',
        image:
          'https://ik.imagekit.io/hsukyjske/Nivya-automobiles/Eeco/Interior/Air-conditioner_heater_desk.avif?updatedAt=1762326188500',
        description:
          'Gives all-season comfort, keeping the cabin temperature just right.',
      },
      {
        title: '3 point ELR',
        image:
          'https://ik.imagekit.io/hsukyjske/Nivya-automobiles/Eeco/Interior/3pointelr_desk.avif?updatedAt=1762326188908',
        description: 'Seat belts for all rear seats for enhanced safety.',
      },
    ],
  },
  'Maruti VICTORIS': {
    Exterior: [
      {
        title: 'Wrap-Around Design',
        image:
          'https://ik.imagekit.io/hsukyjske/Nivya-automobiles/Victoris/Exterior/Desktop-Wrap-around-design.avif?updatedAt=1762327510181',
        description:
          'Announce your arrival with a sweeping silhouette and sculpted lines, a stance that is dynamic in motion, and commanding when still.',
      },
      {
        title: '​Bold-Cut LED DRLs and Headlamps',
        image:
          'https://ik.imagekit.io/hsukyjske/Nivya-automobiles/Victoris/Exterior/Desktop-Bold-cut-LED-DRLs-and-Headlamps%20(1).avif?updatedAt=1762327510685',
        description:
          'Command the view with bold-cut LED DRLs and headlamps that assert a confident presence, leaving a bold first impression.',
      },
      {
        title: 'Segmented Rear LED Tail Lamps',
        image:
          'https://ik.imagekit.io/hsukyjske/Nivya-automobiles/Victoris/Exterior/Desktop-Segmented-Rear-LED-Tail-Lamps%20(1).avif?updatedAt=1762327510161',
        description:
          'Mark your departure with a seamless tail light that stretches across the rear, leaving a signature that lingers long after it’s gone',
      },
      {
        title: 'Aero Cut Alloy Wheels',
        image:
          'https://ik.imagekit.io/hsukyjske/Nivya-automobiles/Victoris/Exterior/Desktop-R17-Alloy-Wheels%20(1).avif?updatedAt=1762327510668',
        description:
          'Experience a perfect fusion of form and function with Aero Cut Alloy Wheels that are as tough as they are stylish.',
      },
    ],
    Interiors: [
      {
        title: 'Dual Tone Interiors',
        image:
          'https://ik.imagekit.io/hsukyjske/Nivya-automobiles/Victoris/Interior/Desktop-Dual-Tone-Interior---Seat.avif?updatedAt=1762327526962',
        description:
          'Step into a world of curated harmony with dual tone interiors that blend effortless style with quiet sophistication.',
      },
      // {
      //   title: 'Panoramic Sunroof',
      //   image:
      //     'https://ik.imagekit.io/hsukyjske/Nivya-automobiles/Eeco/Interior/bootspace_desk%20(1).avif?updatedAt=1762326188589',
      //   description: 'Let the world in with the panoramic sunroof that opens up to a sky of possibilities, giving you a sense of expanse and freedom.',
      // },
      {
        title: '64-Color Ambient Lighting',
        image:
          'https://ik.imagekit.io/hsukyjske/Nivya-automobiles/Victoris/Interior/Desktop-64-Color-Ambient-Lighting.avif?updatedAt=1762327487206',
        description:
          'Set the mood for every drive with 64-color ambient lighting that transforms your cabin into a reflection of your state of mind.',
      },
      {
        title: 'Three-Layer Dashboard',
        image:
          'https://ik.imagekit.io/hsukyjske/Nivya-automobiles/Victoris/Interior/Desktop-3-Layered-Dashboard.avif?updatedAt=1762327487202',
        description:
          'Witness precision in every detail with a three-layer dashboard that is a testament to the Victoris’s elegant, high-tech design.',
      },
      {
        title: '26.03cm Multi-Information Digital Cluster',
        image:
          'https://ik.imagekit.io/hsukyjske/Nivya-automobiles/Victoris/Interior/Desktop-10-25-Digital-MID.avif?updatedAt=1762327487667',
        description:
          'Stay informed with the 26.03cm multi-information digital cluster, which presents all the details you need for the utmost control.',
      },
    ],
  },
  'Maruti Brezza': {
    Exterior: [
      {
        title: 'Geometric Alloy Wheels',
        image:
          'https://ik.imagekit.io/hsukyjske/Nivya-automobiles/Brezza/Exterior/Wheel_desk_brezza.avif?updatedAt=1762328699348',
        description:
          'Own the streets with geometric alloy wheels that are tough, stylish, and ready to give your ride an urban sporty edge.',
      },
      {
        title: 'Dual LED Projector Headlamps with LED DRLs',
        image:
          'https://ik.imagekit.io/hsukyjske/Nivya-automobiles/Brezza/Exterior/DRL_desk_brezza.avif?updatedAt=1762328699466',
        description:
          'Step into the spotlight with dual LED projectors and DRLs, that give full brightness for a youthful and energetic ride.',
      },
      {
        title: 'LED Tail Lamp',
        image:
          'https://ik.imagekit.io/hsukyjske/Nivya-automobiles/Brezza/Exterior/Tailight_desk_brezza.avif?updatedAt=1762328699407',
        description:
          'Stay lit always with LED tail lamps that deliver impressive brightness and energy efficiency, making sure you stand out in any weather, day, or night.',
      },
      {
        title: 'Dual Tone Exterior',
        image:
          'https://ik.imagekit.io/hsukyjske/Nivya-automobiles/Brezza/Exterior/Dualtone_desk_brezza.avif?updatedAt=1762328699421',
        description:
          'Boost your commanding stance with dual tone roof that blends boldness with precision detailing, giving an impressive look.',
      },
    ],
    Interiors: [
      {
        title: 'Rear AC Vents',
        image:
          'https://ik.imagekit.io/hsukyjske/Nivya-automobiles/Brezza/Interior/acvent_int_desk_brezza.avif?updatedAt=1762328721482',
        description:
          'Stay cool and comfy with rear AC vents that deliver uniform cooling, ensuring optimal airflow and a refreshing drive, no matter the weather.',
      },

      {
        title: 'Flat Bottom Steering Wheel',
        image:
          'https://ik.imagekit.io/hsukyjske/Nivya-automobiles/Brezza/Interior/steering_desk_int_brezza.avif?updatedAt=1762328721468',
        description:
          'Embrace effortless control with the flat-bottom steering wheel, designed for precision handling and a sporty and urban feel that elevates your driving experience.',
      },
      {
        title: 'Wireless Charging',
        image:
          'https://ik.imagekit.io/hsukyjske/Nivya-automobiles/Brezza/Interior/charger_int_desk_brezza.avif?updatedAt=1762328720916',
        description:
          'Stay connected on every adventure. Designed for the modern urban explorer, it keeps your smartphone always charged without the hassle of cables.',
      },
    ],
  },
  'Maruti Ertiga': {
    Exterior: [
      {
        title: 'Dynamic Chrome Winged Front Grille',
        image:
          'https://ik.imagekit.io/hsukyjske/Nivya-automobiles/Ertiga/Exterior/Dynamic-Chrome-Winged-Front-Grille_2560x1440.avif?updatedAt=1762329509009',
        description: 'Bold, stylish touch for a striking first impression.',
      },
      {
        title: '3D Origami Style Led Tail Lamps',
        image:
          'https://ik.imagekit.io/hsukyjske/Nivya-automobiles/Ertiga/Exterior/3D-Origami-Style-LED-Tail-Lamps_2560x1440.avif?updatedAt=1762329508953',
        description: 'Elegantly sculpted for a striking appearance.',
      },
      {
        title: 'Machined Two-Tone Alloy Wheels',
        image:
          'https://ik.imagekit.io/hsukyjske/Nivya-automobiles/Ertiga/Exterior/Machined-Two-Tone-Alloy-Wheels_2560x1440.avif?updatedAt=1762329509006',
        description: 'Premium finish for a bold road presence.',
      },
      {
        title: 'ORVM',
        image:
          'https://ik.imagekit.io/hsukyjske/Nivya-automobiles/Ertiga/Exterior/New-OVRM-desktop-image.avif?updatedAt=1762329508541',
        description: 'Electrically adjustable & foldable mirrors.',
      },
      {
        title: 'Back Door Garnish',
        image:
          'https://ik.imagekit.io/hsukyjske/Nivya-automobiles/Ertiga/Exterior/New-Back-Door-Garnish-desktop-image.avif?updatedAt=1762329508513',
        description: 'Elegant chrome accent for a premium flair.',
      },
    ],
    Interiors: [
      {
        title: 'Sculpted Dashboard With Metallic Teak Wooden Finish',
        image:
          'https://ik.imagekit.io/hsukyjske/Nivya-automobiles/Ertiga/Interior/Sculpted-Dashboard_2560x1440_v1.avif?updatedAt=1762329529557',
        description: 'Blends style and comfort for every drive.',
      },

      {
        title: 'Dual Tone Interior',
        image:
          'https://ik.imagekit.io/hsukyjske/Nivya-automobiles/Ertiga/Interior/Desktop-Ertiga-Dual-tone-carousel-image.avif?updatedAt=1762329529564',
        description:
          ' Plush dual tone interiors that enhance style & premium feel.',
      },
      {
        title: 'Smart Flexi Seating',
        image:
          'https://ik.imagekit.io/hsukyjske/Nivya-automobiles/Ertiga/Interior/Smart-Flexi-Seating.avif?updatedAt=1762329529562',
        description: 'Optimal comfort and convenience.',
      },
      {
        title: '3rd Row AC With 3 Stage Control',
        image:
          'https://ik.imagekit.io/hsukyjske/Nivya-automobiles/Ertiga/Interior/3rd-row-ac.avif?updatedAt=1762329529508',
        description: 'Customised airflow for 3rd row occupants.',
      },
      {
        title: 'USB Fast Charger (Type-C)',
        image:
          'https://ik.imagekit.io/hsukyjske/Nivya-automobiles/Ertiga/Interior/USB-Fast-Charger_2560x1440.avif?updatedAt=1762330162275',
        description: 'Fast charging access for rear seats.',
      },
    ],
  },
  'Maruti Dzire': {
    Exterior: [
      {
        title: 'Sleek Line LED DRLs',
        image:
          'https://ik.imagekit.io/hsukyjske/Nivya-automobiles/Dzire/Exterior/DRL_desktop.avif?updatedAt=1762416480165',
        description:
          ' Flowing seamlessly around the grille, these add a bold, futuristic edge to the Dzire’s front profile.',
      },
      {
        title: 'LED Crystal Vision Headlamps',
        image:
          'https://ik.imagekit.io/hsukyjske/Nivya-automobiles/Dzire/Exterior/Dzire_Desktop_Image_Front_02.avif?updatedAt=1762416510378',
        description:
          ' Light up the road ahead with precision and style. These headlamps offer enhanced visibility and a signature look that stands out.',
      },
      {
        title: '3D Trinity Rear Lamps',
        image:
          'https://ik.imagekit.io/hsukyjske/Nivya-automobiles/Dzire/Exterior/Taillight_desk.avif?updatedAt=1762416480110',
        description:
          ' A distinctive rear design with LED lamps that leave a lasting impression—day or night.',
      },
      {
        title: 'Two-Tone Precision-Cut Alloy Wheels',
        image:
          'https://ik.imagekit.io/hsukyjske/Nivya-automobiles/Dzire/Exterior/Tyre_desk.avif?updatedAt=1762416480111',
        description:
          ' Engineered for performance, styled for admiration. These alloys bring a premium finish and sharp character to every spin.',
      },
      {
        title: 'Shark-Fin Antenna',
        image:
          'https://ik.imagekit.io/hsukyjske/Nivya-automobiles/Dzire/Exterior/Finn_desk.avif?updatedAt=1762416480045',
        description:
          ' Sleek by design, smart by function, it slices through the air while sharpening your car’s sporty edge.',
      },
    ],
    Interiors: [
      {
        title: 'Electric Sunroof',
        image:
          'https://ik.imagekit.io/hsukyjske/Nivya-automobiles/Dzire/Interior/sunroof_desk.avif?updatedAt=1762416537705',
        description:
          ' Invites the outside in — flooding the cabin with natural light and creating an expansive, airy atmosphere.',
      },

      {
        title: 'SmartPlay Pro+ infotainment System with Surround Sense by ARKAMYS™',
        image:
          'https://ik.imagekit.io/hsukyjske/Nivya-automobiles/Dzire/Interior/Infotainment_desk.avif?updatedAt=1762416537716',
        description:
          ' Gives you immersive sound and seamless connectivity with wireless Apple CarPlay® and Android Auto™.',
      },
      {
        title: 'Automatic Climate Control',
        image:
          'https://ik.imagekit.io/hsukyjske/Nivya-automobiles/Dzire/Interior/Climate_control_desk.avif?updatedAt=1762416537714',
        description: ' Wraps you in comfort, adjusting effortlessly to keep your drive as smooth as your success.',
      },
      {
        title: 'Wireless Charger',
        image:
          'https://ik.imagekit.io/hsukyjske/Nivya-automobiles/Dzire/Interior/wireless_charger_desk.avif?updatedAt=1762416537687',
        description: ' Keeps your devices powered and your space clutter-free, so you can stay connected on the go.',
      },
      {
        title: 'Rear AC Vents',
        image:
          'https://ik.imagekit.io/hsukyjske/Nivya-automobiles/Dzire/Interior/Rear_ac_vent_desk.avif?updatedAt=1762416537712',
        description: ' Personalise your comfort, front to back — with faster cooling and consistent airflow throughout the cabin.',
      },
      {
        title: 'Dual-Tone Sophisticated Interiors',
        image:
          'https://ik.imagekit.io/hsukyjske/Nivya-automobiles/Dzire/Interior/cabin_space_desk.avif?updatedAt=1762416537717',
        description: 'Transforms your cabin into a perfect blend of style and elegance, elevating your driving experience.',
      },
    ],
  },
};

export default function FeaturesSection({ vehicleName }) {
  const [activeTab, setActiveTab] = useState('Exterior');

  // ✅ Pick correct vehicle’s features
  const vehicleFeatures =
    featureData[vehicleName] || featureData['Maruti Alto K10']; // fallback

  const tabs = Object.keys(vehicleFeatures);

  return (
    <section className='w-full px-6 py-12 text-white bg-gray-900'>
      <div className='flex flex-col gap-12 mx-auto xl:flex-row max-w-7xl '>
        {/* Left Column - Vehicle Form */}
        <div className='flex w-full'>
          <VehicleForm
            Vehicle={<option value={vehicleName}>{vehicleName}</option>}
          />
        </div>

        {/* Right Column - Features */}
        <div className='flex flex-col w-full gap-6 lg:w-4xl'>
          <div className='flex flex-wrap justify-center gap-3 lg:justify-center'>
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 font-semibold text-sm rounded-md transition-all duration-200 ${
                  activeTab === tab
                    ? 'bg-red-600 shadow-lg'
                    : 'bg-black hover:bg-red-800'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className='text-center lg:text-left'>
            <h2 className='text-3xl font-extrabold md:text-4xl'>
              {vehicleName} - {activeTab}
            </h2>
            <div className='w-24 h-1 mt-2 bg-red-600 rounded-full'></div>
          </div>

          <div className='flex-grow'>
            <Swiper
              modules={[Navigation, Autoplay, Pagination]}
              navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 4000, disableOnInteraction: false }}
              loop
              spaceBetween={24}
              slidesPerView={1}
              breakpoints={{
                640: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 2 },
                1440: { slidesPerView: 2 },
              }}
            >
              {vehicleFeatures[activeTab]?.map((feature, index) => (
                <SwiperSlide key={index}>
                  <div className='relative overflow-hidden transition-transform shadow-lg h-72 md:h-80 rounded-xl '>
                    <Image
                      src={feature.image}
                      alt={feature.title}
                      fill
                      className='object-cover rounded-xl'
                    />
                    <div className='absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent rounded-xl' />
                    <div className='absolute bottom-4 left-4 right-4'>
                      <h3 className='text-lg font-bold'>{feature.title}</h3>
                      <p className='mt-1 text-sm text-gray-200'>
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
}
