'use client';

import ResponsiveBanner from '@/app/components/ResponsiveBanner';
import { useState } from 'react';
import Image from 'next/image';
import toast from 'react-hot-toast';

// ---------- Data ----------
const accessoriesData = {
  Exteriors: [
    {
      img: 'https://marutistoragenew1.azureedge.net/paccmicroservice/990J0M75T01-030/990j0m75t01-030_body_side_moulding_garnish.jpg',
      name: 'Body Side Moulding | New Swift',

      code: '990J0M75T01-030',
    },
    {
      img: 'https://marutistoragenew1.azureedge.net/paccmicroservice/990J0M75T01-020/990j0m75t01-020_body_side_moulding_white.jpg',
      name: 'Body Side Moulding | New Swift',

      code: '990J0M75T01-020',
    },
    {
      img: 'https://marutistoragenew1.azureedge.net/paccmicroservice/990J0M75T01-010/990j0m75t01-010_body_side_moulding_red.jpg',
      name: 'Body Side Moulding | New Swift',

      code: '990J0M75T01-010',
    },
    {
      img: 'https://marutistoragenew1.azureedge.net/paccmicroservice/990J0M75TQ0-010/990j0m75tq0-010_door_visor.jpg',
      name: 'Door Visor | New Swift',

      code: '990J0M75TQ0-010',
    },
    {
      img: 'https://marutistoragenew1.azureedge.net/paccmicroservice/990J0M75TQ0-020/990j0m75tq0-020_door_visor_steel.jpg',
      name: 'Door Visor | New Swift',

      code: '990J0M75TQ0-020',
    },
    {
      img: 'https://marutistoragenew1.azureedge.net/paccmicroservice/990J0M75T07-010/990j0m75t07-010_front_skid-_chrome_grey.jpg',
      name: 'Front Skid Plate | New Swift',

      code: '990J0M75T07-010',
    },
    {
      img: 'https://marutistoragenew1.azureedge.net/paccmicroservice/990J0M75T07-030/990j0m75t07-030_front_under_spoiler_black.jpg',
      name: 'Front Underbody Spoiler | New Swift',

      code: '990J0M75T07-030',
    },
    {
      img: 'https://marutistoragenew1.azureedge.net/paccmicroservice/990J0M75T07-060/990j0m75t07-060_rear_under_spoiler_black_red.jpg',
      name: 'Rear Underbody Spoiler | New Swift',

      code: '990J0M75T07-060',
    },
    {
      img: 'https://marutistoragenew1.azureedge.net/paccmicroservice/990J0M75T07-070/990j0m75t07-070_rear_under_spoiler_black_white.jpg',
      name: 'Rear Underbody Spoiler | New Swift',

      code: '990J0M75T07-070',
    },
    {
      img: 'https://marutistoragenew1.azureedge.net/paccmicroservice/990J0M75T07-080/990j0m75t07-080_2.jpg',
      name: 'Rear Underbody Spoiler | New Swift',

      code: '990J0M75T07-080',
    },
    // new swift content ends
    // section 2 start
    {
      img: 'https://marutistoragenew1.azureedge.net/paccmicroservice/990J0M75T07-090/990j0m75t07-090_side_under_spoiler_black.jpg',
      name: 'Side Underbody Spoiler | New Swift',

      code: '990J0M75T07-090',
    },
    {
      img: 'https://marutistoragenew1.azureedge.net/paccmicroservice/990J0M75T07-130/990j0m75t07-130_rear_upper_spoiler_black_red.jpg',
      name: 'Rear Upper Spoiler | New Swift',

      code: '990J0M75T07-130',
    },
    {
      img: 'https://marutistoragenew1.azureedge.net/paccmicroservice/990J0M75T07-100/990j0m75t07-100_wheel_arch_black_red.jpg',
      name: 'Wheel Arch Kit| New Swift',

      code: '990J0M75T07-100',
    },
    {
      img: 'https://marutistoragenew1.azureedge.net/paccmicroservice/990J0M75T07-110/990j0m75t07-110_wheel_arch-_black_white.jpg',
      name: 'Wheel Arch Kit| New Swift',

      code: '990J0M75T07-110',
    },
    {
      img: 'https://marutistoragenew1.azureedge.net/paccmicroservice/990J0M75T07-120/990j0m75t07-120_2.jpg',
      name: 'Wheel Arch Kit| New Swift',

      code: '990J0M75T07-120',
    },
    {
      img: 'https://marutistoragenew1.azureedge.net/paccmicroservice/990J0M75T07-140/990j0m75t07-140_rear_upper_spoiler_black_white.jpg',
      name: 'Rear Upper Spoiler | New Swift',

      code: '990J0M75T07-140',
    },
    {
      img: 'https://marutistoragenew1.azureedge.net/paccmicroservice/990J0M75T17-010/990j0m75t17-010_bumper_corne_protector_red.jpg',
      name: 'Bumper Corner Protector | New Swift',

      code: '990J0M75T17-010',
    },
    {
      img: 'https://marutistoragenew1.azureedge.net/paccmicroservice/990J0M75T17-070/990j0m75t17-070_4.jpg',
      name: 'Bumper Corner Protector | New Swift',

      code: '990J0M75T17-070',
    },
    {
      img: 'https://marutistoragenew1.azureedge.net/paccmicroservice/990J0M75T17-060/990j0m75t17-060_4.jpg',
      name: 'Bumper Corner Protector | New Swift',

      code: '990J0M75T17-060',
    },
    {
      img: 'https://marutistoragenew1.azureedge.net/paccmicroservice/990J0M75T17-030/990j0m75t17-030_bumper_corne_protector_orange.jpg',
      name: 'Bumper Corner Protector | New Swift',

      code: '990J0M75T17-030',
    },
    {
      img: 'https://marutistoragenew1.azureedge.net/paccmicroservice/990J0M75T17-020/990j0m75t17-020_4.jpg',
      name: 'Bumper Corner Protector | New Swift',

      code: '990J0M75T17-020',
    },
    {
      img: 'https://marutistoragenew1.azureedge.net/paccmicroservice/990J0M75T17-050/990j0m75t17-050_bumper_corne_protector_silver.jpg',
      name: 'Bumper Corner Protector | New Swift',

      code: '990J0M75T17-050',
    },
    {
      img: 'https://marutistoragenew1.azureedge.net/paccmicroservice/990J0M75T17-040/990j0m75t17-040_bumper_corne_protector_white.jpg',
      name: 'Hood + Roof Graphics | New Swift',

      code: '990J0M75T17-040',
    },
    {
      img: 'https://marutistoragenew1.azureedge.net/paccmicroservice/990J0M75TJ2-010/990j0m75tj2-010_hood_graphics_carbon.jpg',
      name: 'Rear Underbody Spoiler | New Swift',

      code: '990J0M75TJ2-010',
    },
    {
      img: 'https://marutistoragenew1.azureedge.net/paccmicroservice/990J0M75TJ2-030/990j0m75tj2-030_hood_graphics_black.jpg',
      name: 'Hood + Roof Graphics | New Swift',

      code: '990J0M75TJ2-030',
    },
    {
      img: 'https://marutistoragenew1.azureedge.net/paccmicroservice/72201M75T00/72201m75t00_mud_flap.jpg',
      name: 'Mud Flap | New Swift',

      code: '72201M75T00',
    },
    // section 2 end
    {
      img: 'https://images-saboomaruti-in.s3.ap-south-1.amazonaws.com/Arena/accessory-page/exterior-webp/83716M53M00-U3J_1.webp',
      name: 'Graphic Speaker | Alto',

      code: '83716M53M00-U3J',
    },

    {
      img: 'https://az-ci-afde-prd-arena-01-e7fmh3dxacbgeyh5.z01.azurefd.net/-/media/marutigeniuneaccessories_27112019/old_20210309/q6/77862m78l00-0pg_1.jpg',
      name: 'Car Emblem - Eeco Logo',

      code: '77862M78L00-0PG',
    },
    {
      img: 'https://az-ci-afde-prd-arena-01-e7fmh3dxacbgeyh5.z01.azurefd.net/-/media/marutigeniuneaccessories_27112019/2021/05/990j0m55r00-020_1.jpg',
      name: 'Mud Flap Set - Front',

      code: '990J0M55R00-020',
    },
    {
      img: 'https://az-ci-afde-prd-arena-01-e7fmh3dxacbgeyh5.z01.azurefd.net/-/media/marutigeniuneaccessories_27112019/2020/11/990j0m53m00-020_1.jpg',
      name: 'Mud Flap Set - Back',

      code: '990J0M53M00-020',
    },
    // Line 2
    {
      img: 'https://az-ci-afde-prd-arena-01-e7fmh3dxacbgeyh5.z01.azurefd.net/-/media/marutigeniuneaccessories_27112019/partsimages/2023/02/990j0m62s00-020_1-jpg.jpg',
      name: 'Mud Flop Set - Front',

      code: '990J0M62S00-020',
    },
    {
      img: 'https://az-ci-afde-prd-arena-01-e7fmh3dxacbgeyh5.z01.azurefd.net/-/media/marutigeniuneaccessories_27112019/2020/11/990j0m53m00-010_1.jpg',
      name: 'Mud Flap Set - Front',

      code: '990J0M53M00-010',
    },
    {
      img: 'https://az-ci-afde-prd-arena-01-e7fmh3dxacbgeyh5.z01.azurefd.net/-/media/marutigeniuneaccessories_27112019/2021/04-revised/990j0m62s00-030_1.jpg',
      name: 'Mud Flap Set - Rear',

      code: '990J0M62S00-030',
    },
    {
      img: 'https://az-ci-afde-prd-arena-01-e7fmh3dxacbgeyh5.z01.azurefd.net/-/media/marutigeniuneaccessories_27112019/old_20210309/q11/990j0m55r00-010_3.jpg',
      name: 'Mud Flap Set - Rear',

      code: '990J0M55R00-010',
    },
    // Line 3
    {
      img: 'https://az-ci-afde-prd-arena-01-e7fmh3dxacbgeyh5.z01.azurefd.net/-/media/marutigeniuneaccessories_27112019/2021/04-revised1/990j0m52m00-010_1.jpg',
      name: 'Mud Flap Set',

      code: '990J0M52M00-010',
    },
    {
      img: 'https://az-ci-afde-prd-arena-01-e7fmh3dxacbgeyh5.z01.azurefd.net/-/media/marutigeniuneaccessories_27112019/partsimages/2022/04/celerio/990j0m81r17-010_0-jpg.jpg',
      name: 'Bumper Corner Protector',

      code: '990J0M81R17-010',
    },

    {
      img: 'https://az-ci-afde-prd-arena-01-e7fmh3dxacbgeyh5.z01.azurefd.net/-/media/marutigeniuneaccessories_27112019/old_20210309/q7/99000m99110_1.jpg',
      name: 'Mud Flap Set - Front & Rear',

      code: '99000M99110',
    },

    {
      img: 'https://az-ci-afde-prd-arena-01-e7fmh3dxacbgeyh5.z01.azurefd.net/-/media/marutigeniuneaccessories_27112019/old_20210309/q22/990j0m69r00-090_1.jpg',
      name: 'Mud Flap Set - Rear | Eeco',

      code: '990J0M69R00-090',
    },
    {
      img: 'https://az-ci-afde-prd-arena-01-e7fmh3dxacbgeyh5.z01.azurefd.net/-/media/marutigeniuneaccessories_27112019/partsimages/2022/08/24/990j0m62s00-010_1.jpg',
      name: 'Mud Flap Set - Front and Rear',

      code: '990J0M62S00-010',
    },
    {
      img: 'https://az-ci-afde-prd-arena-01-e7fmh3dxacbgeyh5.z01.azurefd.net/-/media/marutigeniuneaccessories_27112019/partsimages/2022/08/18/990j0m53t00-010_0.jpg',
      name: 'Mud Flap Set | Alto K10',

      code: '990J0M53T00-010',
    },
  ],
  Interior: [
    {
      img: 'https://marutistoragenew1.azureedge.net/paccmicroservice/990J0M75TPJ-050/990j0m75tpj-050_interior_styli_kit_carbon_red.jpg',
      name: 'Interior Styling Kit - New Swift',

      code: '990J0M75TPJ-050',
    },
    {
      img: 'https://marutistoragenew1.azureedge.net/paccmicroservice/990J0M75TPJ-040/990j0m75tpj-040_interior_styli_kit_carbon_blue.jpg',
      name: 'Interior Styling Kit - New Swift',

      code: '990J0M75TPJ-040',
    },
    {
      img: 'https://marutistoragenew1.azureedge.net/paccmicroservice/990J0M75TPJ-010/990j0m75tpj-010_interior_styli_kit_carbon.jpg',
      name: 'Interior Styling Kit - New Swift',

      code: '990J0M75TPJ-010',
    },
    {
      img: 'https://marutistoragenew1.azureedge.net/paccmicroservice/990J0M75TPJ-030/990j0m75tpj-030_interior_styli_kit_carbon_grey.jpg',
      name: 'Interior Styling Kit - New Swift',

      code: '990J0M75TPJ-030',
    },
    {
      img: 'https://marutistoragenew1.azureedge.net/paccmicroservice/75901M75T00/75901m75t00_all_weath_3d_mat.jpg',
      name: 'All Weather 3D Mat | New Swift',

      code: '75901M75T00',
    },
    {
      img: 'https://marutistoragenew1.azureedge.net/paccmicroservice/990J0M75TM6-010/990j0m75tm6-010_illuminated_door_sill.jpg',
      name: 'Illuminated Door Still Guard | New Swift',

      code: '990J0M75TM6-010',
    },
    {
      img: 'https://marutistoragenew1.azureedge.net/paccmicroservice/75901M75T40/75901m75t40_2.jpg',
      name: 'Black Mat - PVC | New Swift',

      code: '75901M75T40',
    },
    {
      img: 'https://marutistoragenew1.azureedge.net/paccmicroservice/75901M75T30/75901m75t30_designer_mat.jpg',
      name: 'Designer Mat - PVC | New Swift',

      code: '75901M75T30',
    },
    {
      img: 'https://marutistoragenew1.azureedge.net/paccmicroservice/990J0M75TM8-010/990j0m75tm8-010_door_sill_guard_metal.jpg',
      name: 'Stainless Steel Door Still Guard | New Swift',

      code: '990J0M75TM8-010',
    },
    {
      img: 'https://marutistoragenew1.azureedge.net/paccmicroservice/75901M75T50/75901m75t50_2.jpg',
      name: 'Transparent Mat | New Swift',

      code: '75901M75T50',
    },
    {
      img: 'https://marutistoragenew1.azureedge.net/paccmicroservice/75901M75TA0/75901m75ta0_deluxe_carpet_mat.jpg',
      name: 'Deluxe Carpet Mat | New Swift',

      code: '75901M75TA0',
    },
    //interior new ending
    {
      img: 'https://az-ci-afde-prd-arena-01-e7fmh3dxacbgeyh5.z01.azurefd.net/-/media/marutigeniuneaccessories_27112019/old_20210309/q6/77862m78l00-0pg_1.jpg',
      name: 'Steering Wheel Cover',

      code: '77862M78L00-0PG',
    },
    {
      img: 'https://az-ci-afde-prd-arena-01-e7fmh3dxacbgeyh5.z01.azurefd.net/-/media/marutigeniuneaccessories_27112019/2021/05/990j0m55r00-020_1.jpg',
      name: 'Steering Wheel Cover',

      code: '990J0M55R00-020',
    },
    {
      img: 'https://az-ci-afde-prd-arena-01-e7fmh3dxacbgeyh5.z01.azurefd.net/-/media/marutigeniuneaccessories_27112019/2020/11/990j0m53m00-020_1.jpg',
      name: 'PVC Mat',

      code: '990J0M53M00-020',
    },

    {
      img: 'https://az-ci-afde-prd-arena-01-e7fmh3dxacbgeyh5.z01.azurefd.net/-/media/marutigeniuneaccessories_27112019/2020/11/990j0m69rp6-030_1.jpg',
      name: 'Door Still Guard',

      code: '990J0M69RP6-030',
    },
    {
      img: 'https://az-ci-afde-prd-arena-01-e7fmh3dxacbgeyh5.z01.azurefd.net/-/media/marutigeniuneaccessories_27112019/old_20210309/q17/990j0m62sp6-020_1.jpg',
      name: 'Door Still Gaurd',

      code: '990J0M62SP6-020',
    },
    {
      img: 'https://az-ci-afde-prd-arena-01-e7fmh3dxacbgeyh5.z01.azurefd.net/-/media/marutigeniuneaccessories_27112019/old_20210309/q17/990j0m62sp6-010_1.jpg',
      name: 'Door Still Guard',

      code: '990J0M62SP6-010',
    },
    {
      img: 'https://az-ci-afde-prd-arena-01-e7fmh3dxacbgeyh5.z01.azurefd.net/-/media/marutigeniuneaccessories_27112019/partsimages/2022/08/18/88910m53t00-r3f_1.jpg',
      name: 'Rear Parcel Tray',

      code: '88910M53T00-R3F',
    },
    // line 4
    {
      img: 'https://az-ci-afde-prd-arena-01-e7fmh3dxacbgeyh5.z01.azurefd.net/-/media/marutigeniuneaccessories_27112019/old_20210309/q27/990j0m75lc1-050_1.jpg',
      name: 'Steering Wheel Cover',

      code: '990J0M75LC1-050',
    },
    {
      img: 'https://az-ci-afde-prd-arena-01-e7fmh3dxacbgeyh5.z01.azurefd.net/-/media/marutigeniuneaccessories_27112019/partsimages/2022/11/18/75901m78tg0_1.jpg',
      name: 'Black Mat - Eeco',

      code: '75901M78TG0',
    },
    {
      img: 'https://az-ci-afde-prd-arena-01-e7fmh3dxacbgeyh5.z01.azurefd.net/-/media/marutigeniuneaccessories_27112019/old_20210309/q26/990j0m74lc1-170_1.jpg',
      name: 'Steering Wheel Cover',

      code: '990J0M74LC1-170',
    },
    {
      img: 'https://az-ci-afde-prd-arena-01-e7fmh3dxacbgeyh5.z01.azurefd.net/-/media/marutigeniuneaccessories_27112019/2020/11/990j0m53ma0-080_1.jpg',
      name: 'Transparent Mat - Alto',

      code: '990J0M53MA0-080',
    },
    //line 5
    {
      img: 'https://az-ci-afde-prd-arena-01-e7fmh3dxacbgeyh5.z01.azurefd.net/-/media/marutigeniuneaccessories_27112019/partsimages/2022/08/18/75901m53t00_0.jpg',
      name: 'Carpet Matt - Alto K10',

      code: '75901M53T00',
    },
    {
      img: 'https://az-ci-afde-prd-arena-01-e7fmh3dxacbgeyh5.z01.azurefd.net/-/media/marutigeniuneaccessories_27112019/old_20210309/q3/75901m62s00_1.jpg',
      name: 'Carpet Mat - Spresso',

      code: '75901M62S00',
    },

    {
      img: 'https://az-ci-afde-prd-arena-01-e7fmh3dxacbgeyh5.z01.azurefd.net/-/media/marutigeniuneaccessories_27112019/partsimages/2022/06/27/75901m66t00_1.jpg',
      name: 'Deluxe Carpet Matt - Brezza',

      code: '75901M66T00',
    },
  ],
  'Car Care': [
    {
      img: 'https://marutistoragenew1.azureedge.net/paccmicroservice/990J0M75T02-030/990j0m75t02-030_body_cover.jpg',
      name: 'Body Cover | New Swift',
      code: '990J0M75T02-030',
    },
    {
      img: 'https://marutistoragenew1.azureedge.net/paccmicroservice/990J0M75T02-020/990j0m75t02-020_body_cover.jpg',
      name: 'Body Cover | New Swift',

      code: '990J0M75T02-020',
    },
    {
      img: 'https://az-ci-afde-prd-arena-01-e7fmh3dxacbgeyh5.z01.azurefd.net/-/media/marutigeniuneaccessories_27112019/old_20210309/q7/99000m99178_1.jpg',
      name: 'Super Lubricant',

      code: '99000M99178',
    },

    {
      img: 'https://az-ci-afde-prd-arena-01-e7fmh3dxacbgeyh5.z01.azurefd.net/-/media/marutigeniuneaccessories_27112019/2020/10/95850m69rb0_1.jpg',
      name: 'Cabin Air Filter - PM10',
      code: '95850M69RB0',
    },
    {
      img: 'https://az-ci-afde-prd-arena-01-e7fmh3dxacbgeyh5.z01.azurefd.net/-/media/marutigeniuneaccessories_27112019/2021/04-revised1/95862m62s20_1.jpg',
      name: 'Cabin Air Filter - PM10',
      code: '95862M62S20',
    },
    {
      img: 'https://az-ci-afde-prd-arena-01-e7fmh3dxacbgeyh5.z01.azurefd.net/-/media/marutigeniuneaccessories_27112019/old_20210309/q11/990j0m53ms0-010_1.jpg',
      name: 'Cabin Air Filter - PM10',
      code: '990J0M53MS0-010',
    },
    {
      img: 'https://az-ci-afde-prd-arena-01-e7fmh3dxacbgeyh5.z01.azurefd.net/-/media/marutigeniuneaccessories_27112019/old_20210309/q11/990j0m53ms0-010_1.jpg',
      name: 'Cabin Air Filter - PM10',
      code: '990J0M79GS0-010',
    },
    //line 2
    {
      img: 'https://az-ci-afde-prd-arena-01-e7fmh3dxacbgeyh5.z01.azurefd.net/-/media/marutigeniuneaccessories_27112019/partsimages/2022/12/990j0m69rs0-010_1.jpg',
      name: 'PM 2.5 AC Filter',
      code: '990J0M69RS0-010',
    },
    {
      img: 'https://az-ci-afde-prd-arena-01-e7fmh3dxacbgeyh5.z01.azurefd.net/-/media/marutigeniuneaccessories_27112019/2021/04-revised/990j0m56rs0-010_1.jpg',
      name: 'Cabin Air Filter',
      code: '990J0M56RS0-010',
    },
    {
      img: 'https://az-ci-afde-prd-arena-01-e7fmh3dxacbgeyh5.z01.azurefd.net/-/media/marutigeniuneaccessories_27112019/old_20210309/q11/990j0m53mte-240_1.jpg',
      name: 'PM10 Cabin Air Filter',
      code: '990J0M53MTE-240',
    },
    {
      img: 'https://az-ci-afde-prd-arena-01-e7fmh3dxacbgeyh5.z01.azurefd.net/-/media/marutigeniuneaccessories_27112019/partsimages/2022/12/990j0m82ps0-020_1.jpg',
      name: 'Activated Carbon Filter',
      code: '990J0M82PS0-020',
    },

    // line 3

    {
      img: 'https://az-ci-afde-prd-arena-01-e7fmh3dxacbgeyh5.z01.azurefd.net/-/media/marutigeniuneaccessories_27112019/2022/01/990j0m53m02-020_1.jpg',
      name: 'Car Body Cover',
      code: '990J0M53M02-020',
    },
    {
      img: 'https://az-ci-afde-prd-arena-01-e7fmh3dxacbgeyh5.z01.azurefd.net/-/media/marutigeniuneaccessories_27112019/2021/03/0203/990j0m62s02-010_1.jpg',
      name: 'Car Body Cover',
      code: '990J0M62S02-010',
    },

    {
      img: 'https://az-ci-afde-prd-arena-01-e7fmh3dxacbgeyh5.z01.azurefd.net/-/media/marutigeniuneaccessories_27112019/2021/10/ync/990j0m81r02-010_1.jpg',
      name: 'Car Body Cover | Celerio',

      code: '990J0M81R02-010',
    },
    {
      img: 'https://az-ci-afde-prd-arena-01-e7fmh3dxacbgeyh5.z01.azurefd.net/-/media/marutigeniuneaccessories_27112019/2022/01/990j0m69r02-020_1.jpg',
      name: 'Car Body Cover',

      code: '990J0M69R02-010',
    },
    {
      img: 'https://az-ci-afde-prd-arena-01-e7fmh3dxacbgeyh5.z01.azurefd.net/-/media/marutigeniuneaccessories_27112019/2022/01/990j0m69r02-020_1.jpg',
      name: 'Car Body Cover',

      code: '990J0M69R02-030',
    },
    {
      img: 'https://az-ci-afde-prd-arena-01-e7fmh3dxacbgeyh5.z01.azurefd.net/-/media/marutigeniuneaccessories_27112019/2021/04-revised1/99000m99123_1.jpg',
      name: 'Car Body Cover | Eeco',

      code: '99000M99123',
    },

    // line 5

    {
      img: 'https://az-ci-afde-prd-arena-01-e7fmh3dxacbgeyh5.z01.azurefd.net/-/media/marutigeniuneaccessories_27112019/partsimages/2022/08/18/990j0m53t02-030_0.jpg',
      name: 'Body Cover | Alto K10',

      code: '990J0M53T02-010',
    },
    {
      img: 'https://az-ci-afde-prd-arena-01-e7fmh3dxacbgeyh5.z01.azurefd.net/-/media/marutigeniuneaccessories_27112019/partsimages/2022/08/18/990j0m53t02-010_0.jpg',
      name: 'Body Cover | Alto K10',
      code: '990J0M53T02-030',
    },

    {
      img: 'https://az-ci-afde-prd-arena-01-e7fmh3dxacbgeyh5.z01.azurefd.net/-/media/marutigeniuneaccessories_27112019/2021/03/0203/990j0m55r02-030_1.jpg',
      name: 'Car Body Cover (Matte)',
      code: '990J0M55R02-030',
    },
  ],
  Infotainment: [
    {
      img: 'https://az-ci-afde-prd-arena-01-e7fmh3dxacbgeyh5.z01.azurefd.net/-/media/marutigeniuneaccessories_27112019/2020/oldimages/jan/39354m55kb0_1.jpg',
      name: 'Speaker Bracket',
      code: '39354M55KB0',
    },
    {
      img: 'https://az-ci-afde-prd-arena-01-e7fmh3dxacbgeyh5.z01.azurefd.net/-/media/marutigeniuneaccessories_27112019/2020/12/990j0m74lm5-010_1.jpg',
      name: 'Antenna Pig Tail Assembly',
      code: '990J0M74LM5-010',
    },
    {
      img: 'https://az-ci-afde-prd-arena-01-e7fmh3dxacbgeyh5.z01.azurefd.net/-/media/marutigeniuneaccessories_27112019/2020/07/990j0m83km5-010_1.jpg',
      name: 'Speaker Spacer',

      code: '990J0M83KM5-010',
    },
    {
      img: 'https://az-ci-afde-prd-arena-01-e7fmh3dxacbgeyh5.z01.azurefd.net/-/media/marutigeniuneaccessories_27112019/2021/04-revised/990j0m999m5-050_1.jpg',
      name: 'Spacer Ring',
      code: '990J0M999M5-050',
    },
    // LINE 2
    {
      img: 'https://az-ci-afde-prd-arena-01-e7fmh3dxacbgeyh5.z01.azurefd.net/-/media/marutigeniuneaccessories_27112019/2020/10/990j0m999m5-030_1.jpg',
      name: 'Speaker Spacer Set',
      code: '990J0M999M5-030',
    },
    {
      img: 'https://az-ci-afde-prd-arena-01-e7fmh3dxacbgeyh5.z01.azurefd.net/-/media/marutigeniuneaccessories_27112019/old_20210309/q18/990j0m66le1-010_1.jpg',
      name: 'Speaker - 10.16 cm',
      code: '990J0M66LE1-010',
    },
    {
      img: 'https://az-ci-afde-prd-arena-01-e7fmh3dxacbgeyh5.z01.azurefd.net/-/media/marutigeniuneaccessories_27112019/partsimages/2023/02/990j0m60me3-010_1-jpg.jpg',
      name: 'Speaker 15.24 cm',
      code: '990J0M60ME3-010',
    },
    {
      img: 'https://az-ci-afde-prd-arena-01-e7fmh3dxacbgeyh5.z01.azurefd.net/-/media/marutigeniuneaccessories_27112019/old_20210309/q18/990j0m66le1-070_1.jpg',
      name: 'Speaker - Dual Cone',
      code: '990J0M66LE1-070',
    },
    //line 3
    {
      img: 'https://az-ci-afde-prd-arena-01-e7fmh3dxacbgeyh5.z01.azurefd.net/-/media/marutigeniuneaccessories_27112019/2021/04-revised/990j0m53me3-030_1.jpg',
      name: 'Speaker 15.24 cm',
      code: '990J0M53ME3-030',
    },
    {
      img: 'https://az-ci-afde-prd-arena-01-e7fmh3dxacbgeyh5.z01.azurefd.net/-/media/marutigeniuneaccessories_27112019/old_20210309/q18/990j0m66le1-090_1.jpg',
      name: 'Speaker - Dual Cone',
      code: '990J0M66LE1-090',
    },
    {
      img: 'https://az-ci-afde-prd-arena-01-e7fmh3dxacbgeyh5.z01.azurefd.net/-/media/marutigeniuneaccessories_27112019/old_20210309/q18/990j0m66le1-080_1.jpg',
      name: 'Speaker - 10.16 cm',
      code: '990J0M66LE1-080',
    },
    {
      img: 'https://az-ci-afde-prd-arena-01-e7fmh3dxacbgeyh5.z01.azurefd.net/-/media/marutigeniuneaccessories_27112019/old_20210309/r7/990j0m99919-150_1.jpg',
      name: 'Bluetooth Kit',
      code: '990J0M99919-150',
    },
    //line 4
    {
      img: 'https://az-ci-afde-prd-arena-01-e7fmh3dxacbgeyh5.z01.azurefd.net/-/media/marutigeniuneaccessories_27112019/old_20210309/q19/990j0m66le1-100_1.jpg',
      name: 'Speaker - 15.24 cm',
      code: '990J0M66LE1-100',
    },
    {
      img: 'https://www.marutisuzuki.com/assets/images/product-img-01.jpg',
      name: 'Tweeter 80W',
      code: '990J0M999EE-030',
    },
    {
      img: 'https://az-ci-afde-prd-arena-01-e7fmh3dxacbgeyh5.z01.azurefd.net/-/media/marutigeniuneaccessories_27112019/old_20210309/q19/990j0m66le3-030_1.jpg',
      name: 'Speakers -  260W 2 - way',
      code: '990J0M66LE3-030',
    },
    {
      img: 'https://az-ci-afde-prd-arena-01-e7fmh3dxacbgeyh5.z01.azurefd.net/-/media/marutigeniuneaccessories_27112019/2020/11/990j0m66le3-070_1.jpg',
      name: 'Speakers - 16 cm',
      code: '990J0M66LE3-070',
    },
  ],
  Lifestyle: [
    {
      img: 'https://marutistoragenew1.azureedge.net/paccmicroservice/990J0M75T13-010/990j0m75t13-010_rear_mid-g_garnish.jpg',
      name: 'Rear Mild Garnish - New Swift',
      code: '990J0M75T13-010',
    },
    {
      img: 'https://marutistoragenew1.azureedge.net/paccmicroservice/990J0M75T13-060/990j0m75t13-060_front_bumper_white.jpg',
      name: 'Front Bumper Garnish - New Swift',
      code: '990J0M75T13-060',
    },
    {
      img: 'https://marutistoragenew1.azureedge.net/paccmicroservice/990J0M75T13-050/990j0m75t13-050_front_bumpe_garnish_red.jpg',
      name: 'Front Bumper Garnish - New Swift',
      code: '990J0M75T13-050',
    },
    {
      img: 'https://marutistoragenew1.azureedge.net/paccmicroservice/990J0M75T13-040/990j0m75t13-040_window_frame_kit.jpg',
      name: 'Window Frame Kit - New Swift',
      code: '990J0M75T13-040',
    },
    {
      img: 'https://marutistoragenew1.azureedge.net/paccmicroservice/990J0M75T13-030/990j0m75t13-030_rear_mid_garnish_black.jpg',
      name: 'Rear Mid Garnish - New Swift',
      code: '990J0M75T13-030',
    },
    {
      img: 'https://marutistoragenew1.azureedge.net/paccmicroservice/990J0M75T13-090/990j0m75t13-090_3.jpg',
      name: 'Front Grill Insert - New Swift',
      code: '990J0M75T13-090',
    },
    {
      img: 'https://marutistoragenew1.azureedge.net/paccmicroservice/990J0M75T13-080/990j0m75t13-080_front_grill_insert_red.jpg',
      name: 'Front Grill Insert - New Swift',
      code: '990J0M75T13-080',
    },
    {
      img: 'https://marutistoragenew1.azureedge.net/paccmicroservice/990J0M75T13-070/990j0m75t13-070_front_grill_garnish.jpg',
      name: 'Front Grill Insert - New Swift',
      code: '990J0M75T13-070',
    },
    {
      img: 'https://marutistoragenew1.azureedge.net/paccmicroservice/990J0M75T13-130/990j0m75t13-130_3.jpg',
      name: 'Front Grille Insert - New Swift',
      code: '990J0M75T13-130',
    },
    {
      img: 'https://marutistoragenew1.azureedge.net/paccmicroservice/990J0M75T13-120/990j0m75t13-120_3.jpg',
      name: 'Front Grille Insert - New Swift',
      code: '990J0M75T13-120',
    },
    {
      img: 'https://marutistoragenew1.azureedge.net/paccmicroservice/990J0M75T13-110/990j0m75t13-110_3.jpg',
      name: 'Front Grille Insert - New Swift',
      code: '990J0M75T13-110',
    },
    {
      img: 'https://marutistoragenew1.azureedge.net/paccmicroservice/990J0M75T13-100/990j0m75t13-100_front_grill_insert_orange.jpg',
      name: 'Front Grille Insert - New Swift',
      code: '990J0M75T13-100',
    },
    {
      img: 'https://marutistoragenew1.azureedge.net/paccmicroservice/990J0M75TU0-020/990j0m75tu0-020_window_sunsh_door_2d.jpg',
      name: 'Window Sunshade - New Swift',
      code: '990J0M75TU0-020',
    },
    {
      img: 'https://marutistoragenew1.azureedge.net/paccmicroservice/990J0M75TU0-030/990j0m75tu0-030_1.jpg',
      name: 'Window Sunshade - New Swift',
      code: '990J0M75TU0-030',
    },
    {
      img: 'https://marutistoragenew1.azureedge.net/paccmicroservice/990J0M75T13-140/990j0m75t13-140_rear_bumper_black_ganish.jpg',
      name: 'Rear Bumper Garnish - New Swift',
      code: '990J0M75T13-140',
    },
    {
      img: 'https://marutistoragenew1.azureedge.net/paccmicroservice/990J0M75TU0-010/990j0m75tu0-010_window_sunsh_door_4d.jpg',
      name: 'Window Sunshade - New Swift',
      code: '990J0M75TU0-010',
    },
    //new swift content endds

    //line 1
    {
      img: 'https://az-ci-afde-prd-arena-01-e7fmh3dxacbgeyh5.z01.azurefd.net/-/media/marutigeniuneaccessories_27112019/2020/11/990j0m62sp0-010_1.jpg',
      name: 'Speaker Grille - Rear',
      code: '990J0M62SP0-010',
    },
    {
      img: 'https://az-ci-afde-prd-arena-01-e7fmh3dxacbgeyh5.z01.azurefd.net/-/media/marutigeniuneaccessories_27112019/2021/04/990j0m52m13-030_1.jpg',
      name: 'Turn Signal Indicator',
      code: '990J0M52M13-030',
    },

    {
      img: 'https://az-ci-afde-prd-arena-01-e7fmh3dxacbgeyh5.z01.azurefd.net/-/media/marutigeniuneaccessories_27112019/2021/10/ync/990j0m81r13-110_1.jpg',
      name: 'Fog Lamp Garnish',
      code: '990J0M81R13-110',
    },
    {
      img: 'https://az-ci-afde-prd-arena-01-e7fmh3dxacbgeyh5.z01.azurefd.net/-/media/marutigeniuneaccessories_27112019/old_20210309/q14/990j0m55r13-260_1.jpg',
      name: 'C-Pillar Garnish',
      code: '990J0M55R13-260',
    },
    {
      img: 'https://az-ci-afde-prd-arena-01-e7fmh3dxacbgeyh5.z01.azurefd.net/-/media/marutigeniuneaccessories_27112019/2021/10/ync/990j0m81r13-050_1.jpg',
      name: 'Fog Lamp Garnish',
      code: '990J0M81R13-050',
    },
    {
      img: 'https://az-ci-afde-prd-arena-01-e7fmh3dxacbgeyh5.z01.azurefd.net/-/media/marutigeniuneaccessories_27112019/2021/03/0203/990j0m52m13-040_1.jpg',
      name: 'Fuel Lid Garnish',
      code: '990J0M52M13-040',
    },
    //line 3
    {
      img: 'https://az-ci-afde-prd-arena-01-e7fmh3dxacbgeyh5.z01.azurefd.net/-/media/marutigeniuneaccessories_27112019/2022/01/990j0m81r13-100_0.jpg',
      name: 'Fog Lamp Garnish',
      code: '990J0M81R13-100',
    },
    {
      img: 'https://az-ci-afde-prd-arena-01-e7fmh3dxacbgeyh5.z01.azurefd.net/-/media/marutigeniuneaccessories_27112019/2022/01/990j0m81r13-040_0.jpg',
      name: 'Fog Lamp Garnish',
      code: '990J0M81R13-040',
    },
    {
      img: 'https://az-ci-afde-prd-arena-01-e7fmh3dxacbgeyh5.z01.azurefd.net/-/media/marutigeniuneaccessories_27112019/partsimages/2022/08/05/990j0m53t13-030_1.jpg',
      name: 'Rear Bumper Garnish',
      code: '990J0M53T13-030',
    },
    {
      img: 'https://az-ci-afde-prd-arena-01-e7fmh3dxacbgeyh5.z01.azurefd.net/-/media/marutigeniuneaccessories_27112019/partsimages/2022/08/18/990j0m53t13-020_0.jpg',
      name: 'Rear Bumper Garnish',
      code: '990J0M53T13-020',
    },
  ],
  'Safety and Security': [
    {
      img: 'https://marutistoragenew1.azureedge.net/paccmicroservice/990J0M75T21-070/990j0m75t21-070_1.jpg',
      name: 'Front Parking Assist System - new Swift',
      code: '990J0M75T21-070',
    },
    {
      img: 'https://az-ci-afde-prd-arena-01-e7fmh3dxacbgeyh5.z01.azurefd.net/-/media/marutigeniuneaccessories_27112019/partsimages/2022/06/29/990j0m66te0-010_1.jpg',
      name: 'T Lead - Brezza',
      code: '990J0M66TE0-010',
    },
    {
      img: 'https://az-ci-afde-prd-arena-01-e7fmh3dxacbgeyh5.z01.azurefd.net/-/media/marutigeniuneaccessories_27112019/2022/01/990j0m52mm5-010_1.jpg',
      name: 'Audio Systen Hardware Kit',
      code: '990J0M52MM5-010',
    },
    {
      img: 'https://az-ci-afde-prd-arena-01-e7fmh3dxacbgeyh5.z01.azurefd.net/-/media/marutigeniuneaccessories_27112019/partsimages/2023/02/990j0m53te0-020_1-jpg.jpg',
      name: 'Rear Door Speaker Harness',
      code: '990J0M53TE0-020',
    },
    //line 2
    {
      img: 'https://az-ci-afde-prd-arena-01-e7fmh3dxacbgeyh5.z01.azurefd.net/-/media/marutigeniuneaccessories_27112019/2020/11/990j0m62se0-020_1.jpg',
      name: 'Speaker Wiring Harness Kit',
      code: '990J0M62SE0-020',
    },
    {
      img: 'https://az-ci-afde-prd-arena-01-e7fmh3dxacbgeyh5.z01.azurefd.net/-/media/marutigeniuneaccessories_27112019/partsimages/2023/02/990j0m53te0-010_1-jpg.jpg',
      name: 'Front Door Speaker Harness',
      code: '990J0M53TE0-010',
    },
    {
      img: 'https://az-ci-afde-prd-arena-01-e7fmh3dxacbgeyh5.z01.azurefd.net/-/media/marutigeniuneaccessories_27112019/2020/11/84702m53m10-5pk_1.jpg',
      name: 'Outside Rear View Mirror',
      code: '84702M53M10-5PK',
    },
    {
      img: 'https://az-ci-afde-prd-arena-01-e7fmh3dxacbgeyh5.z01.azurefd.net/-/media/marutigeniuneaccessories_27112019/2020/11/990j0m62s21-020_1.jpg',
      name: 'Rear Parking Assistance',
      code: '990J0M62S21-020',
    },
    //line 3
    {
      img: 'https://az-ci-afde-prd-arena-01-e7fmh3dxacbgeyh5.z01.azurefd.net/-/media/marutigeniuneaccessories_27112019/partsimages/2022/06/29/990j0m66tpj-030_0.jpg',
      name: 'OVRM and ORVM Auto Cover',
      code: '990J0M66TPJ-030',
    },
    {
      img: 'https://az-ci-afde-prd-arena-01-e7fmh3dxacbgeyh5.z01.azurefd.net/-/media/marutigeniuneaccessories_27112019/2021/1602/990j0m72r11-010_1.jpg',
      name: 'OVRM Turn Indicator',
      code: '990J0M72R11-010',
    },
    {
      img: 'https://az-ci-afde-prd-arena-01-e7fmh3dxacbgeyh5.z01.azurefd.net/-/media/marutigeniuneaccessories_27112019/2022/01/990j0m66tpj-040_0-jpg.jpg',
      name: 'OVRM and IVRM Cover',
      code: '990J0M66TPJ-040',
    },
    {
      img: 'https://az-ci-afde-prd-arena-01-e7fmh3dxacbgeyh5.z01.azurefd.net/-/media/marutigeniuneaccessories_27112019/partsimages/2022/11/18/990j0m52m11-030_1.jpg',
      name: 'Fog Lamp - Eeco',
      code: '990J0M52M11-030',
    },
    //line 4
    {
      img: 'https://marutistoragenew1.azureedge.net/paccmicroservice/990J0M53TF0-030/product-img-101.jpg',
      name: 'Security Vxi+',
      code: '990J0M53TF0-030',
    },
    {
      img: 'https://az-ci-afde-prd-arena-01-e7fmh3dxacbgeyh5.z01.azurefd.net/-/media/marutigeniuneaccessories_27112019/2020/07/990j0m62sf0-020_1.jpg',
      name: 'Secuirty System',
      code: '990J0M62SF0-020',
    },
    {
      img: 'https://az-ci-afde-prd-arena-01-e7fmh3dxacbgeyh5.z01.azurefd.net/-/media/marutigeniuneaccessories_27112019/partsimages/2022/08/24/990j0m69r11-010_1.jpg',
      name: 'Fog Lamp Kit',
      code: '990J0M69R11-010',
    },
    {
      img: 'https://az-ci-afde-prd-arena-01-e7fmh3dxacbgeyh5.z01.azurefd.net/-/media/marutigeniuneaccessories_27112019/old_20210309/q12/990j0m55r11-010_1.jpg',
      name: 'Fog Lamp Kit',
      code: '990J0M55R11-010',
    },
  ],
};

// ---------- Components ----------
const CategoryTabs = ({ active, onChange }) => (
  <div className='flex flex-wrap justify-center gap-3 p-3 mb-8 bg-gray-100 rounded-lg'>
    {Object.keys(accessoriesData).map((cat) => (
      <button
        key={cat}
        onClick={() => onChange(cat)}
        className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
          active === cat
            ? 'bg-black text-white shadow-md'
            : 'bg-white text-gray-700 border hover:bg-gray-200'
        }`}
      >
        {cat}
      </button>
    ))}
  </div>
);

// ---------- Accessory Card ----------
const AccessoryCard = ({
  item,
  onOrder,
  isOpen,
  formData,
  setFormData,
  onSubmit,
  errors,
  isSubmitting,
  message,
}) => (
  <div className='flex flex-col items-center p-4 transition border rounded-lg shadow-sm hover:shadow-lg'>
    <Image
      src={item.img}
      alt={item.name}
      width={400} // set a suitable width
      height={200} // set a suitable height
      className='object-cover mb-4 rounded-md'
      loading='lazy'
    />

    <h3 className='mb-1 text-sm font-medium text-center'>{item.name}</h3>
    <p className='mb-3 text-xs text-gray-500'>{item.code}</p>

    <button
      onClick={() => onOrder(item)}
      className='px-4 py-2 text-white transition bg-black rounded hover:bg-gray-800'
    >
      {isOpen ? 'CLOSE FORM' : 'ORDER NOW'}
    </button>

    {isOpen && (
      <form
        onSubmit={onSubmit}
        className='w-full p-4 mt-4 text-sm border rounded-md bg-gray-50'
      >
        <h4 className='mb-2 font-semibold text-center text-gray-700'>
          Order for {item.name}
        </h4>
        <p className='mb-3 text-xs text-center text-gray-500'>
          Product Code: {item.code}
        </p>

        <input
          type='text'
          placeholder='Your Name'
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className={`w-full px-3 py-2 mb-2 text-sm border rounded-md ${
            errors.name ? 'border-red-500' : ''
          }`}
        />
        {errors.name && (
          <p className='mb-2 text-xs text-red-500'>{errors.name}</p>
        )}

        <input
          type='tel'
          placeholder='Phone Number'
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className={`w-full px-3 py-2 mb-2 text-sm border rounded-md ${
            errors.phone ? 'border-red-500' : ''
          }`}
        />
        {errors.phone && (
          <p className='mb-2 text-xs text-red-500'>{errors.phone}</p>
        )}

        {message && (
          <p
            className={`mb-2 text-center text-sm ${
              message.type === 'success' ? 'text-green-600' : 'text-red-500'
            }`}
          >
            {message.text}
          </p>
        )}

        <button
          type='submit'
          disabled={isSubmitting}
          className={`w-full py-2 mt-2 text-white rounded ${
            isSubmitting
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-red-500 hover:bg-red-600'
          }`}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Order'}
        </button>
      </form>
    )}
  </div>
);

// ---------- Main Page ----------
export default function AccessoriesPage() {
  const [activeCategory, setActiveCategory] = useState('Exteriors');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formData, setFormData] = useState({ name: '', phone: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState(null);

  const accessories = accessoriesData[activeCategory];

  const handleOrderClick = (product) => {
    setSelectedProduct(selectedProduct?.code === product.code ? null : product);
    setFormData({ name: '', phone: '' });
    setErrors({});
    setMessage(null);
  };

  // ---------- Validation ----------
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    const phonePattern = /^[6-9]\d{9}$/; // 10-digit Indian phone number
    if (!phonePattern.test(formData.phone)) {
      newErrors.phone = 'Enter a valid 10-digit phone number';
    }
    return newErrors;
  };

  // ---------- Submit Handler ----------

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});
    setMessage(null);

    try {
      const res = await fetch('/api/accessories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: formData.name,
          customerPhone: formData.phone,
          itemCode: selectedProduct.code,
          itemName: selectedProduct.name,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong.');
      }

      // ✅ Show success toast
      toast.success(data.message || '✅ Order placed!');
      setFormData({ name: '', phone: '' });
      setSelectedProduct(null);
    } catch (error) {
      toast.error({ type: 'error', text: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className='mt-20'>
        <ResponsiveBanner
          desktopSrc='https://www.skyautomobiles.in/_next/image?url=%2Fimages%2Fother%2Fcontact%20us%20banner.webp&w=3840&q=75'
          mobileSrc='https://www.skyautomobiles.in/_next/image?url=%2Fimages%2Fother%2Foffer_mobile.webp&w=1080&q=75'
          altText='Sky Automobiles Contact Us Banner'
        />
      </div>
      <div className='container px-4 py-8 mx-auto max-w-7xl'>
        <h2 className='mb-6 text-2xl font-semibold text-center'>
          Genuine Accessories
        </h2>

        <CategoryTabs active={activeCategory} onChange={setActiveCategory} />

        {accessories.length === 0 ? (
          <p className='text-center text-gray-500'>
            No accessories available for this category.
          </p>
        ) : (
          <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
            {accessories.map((item) => (
              <AccessoryCard
                key={item.code}
                item={item}
                isOpen={selectedProduct?.code === item.code}
                formData={formData}
                setFormData={setFormData}
                onOrder={handleOrderClick}
                onSubmit={handleSubmit}
                errors={errors}
                isSubmitting={isSubmitting}
                message={message}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
