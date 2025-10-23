import Contact from '@/lib/models/contact';
import Vehicle from '@/lib/models/vehicle';
import Accessories from '@/lib/models/accessories';
import Finance from '@/lib/models/finance';
import Insurance from '@/lib/models/insurance';
import Service from '@/lib/models/service';
import TrueValue from '@/lib/models/usedcar';
import { ConnectDB } from '@/lib/config/db';

export async function GET() {
  await ConnectDB();

  // === Define Time Ranges ===
  const now = new Date();

  // Today range
  const startOfToday = new Date(now);
  startOfToday.setHours(0, 0, 0, 0);
  const endOfToday = new Date(now);
  endOfToday.setHours(23, 59, 59, 999);

  // Yesterday range
  const startOfYesterday = new Date(startOfToday);
  startOfYesterday.setDate(startOfYesterday.getDate() - 1);
  const endOfYesterday = new Date(endOfToday);
  endOfYesterday.setDate(endOfYesterday.getDate() - 1);

  // === Parallel Fetch for Counts ===
  const [
    contact,
    vehicle,
    accessories,
    finance,
    insurance,
    service,
    truevalue,
    todayContact,
    todayVehicle,
    todayAccessories,
    todayFinance,
    todayInsurance,
    todayService,
    todayTrueValue,
    yContact,
    yVehicle,
    yAccessories,
    yFinance,
    yInsurance,
    yService,
    yTrueValue,
  ] = await Promise.all([
    // total
    Contact.countDocuments(),
    Vehicle.countDocuments(),
    Accessories.countDocuments(),
    Finance.countDocuments(),
    Insurance.countDocuments(),
    Service.countDocuments(),
    TrueValue.countDocuments(),

    // today
    Contact.countDocuments({ createdAt: { $gte: startOfToday, $lte: endOfToday } }),
    Vehicle.countDocuments({ createdAt: { $gte: startOfToday, $lte: endOfToday } }),
    Accessories.countDocuments({ createdAt: { $gte: startOfToday, $lte: endOfToday } }),
    Finance.countDocuments({ createdAt: { $gte: startOfToday, $lte: endOfToday } }),
    Insurance.countDocuments({ createdAt: { $gte: startOfToday, $lte: endOfToday } }),
    Service.countDocuments({ createdAt: { $gte: startOfToday, $lte: endOfToday } }),
    TrueValue.countDocuments({ createdAt: { $gte: startOfToday, $lte: endOfToday } }),

    // yesterday
    Contact.countDocuments({ createdAt: { $gte: startOfYesterday, $lte: endOfYesterday } }),
    Vehicle.countDocuments({ createdAt: { $gte: startOfYesterday, $lte: endOfYesterday } }),
    Accessories.countDocuments({ createdAt: { $gte: startOfYesterday, $lte: endOfYesterday } }),
    Finance.countDocuments({ createdAt: { $gte: startOfYesterday, $lte: endOfYesterday } }),
    Insurance.countDocuments({ createdAt: { $gte: startOfYesterday, $lte: endOfYesterday } }),
    Service.countDocuments({ createdAt: { $gte: startOfYesterday, $lte: endOfYesterday } }),
    TrueValue.countDocuments({ createdAt: { $gte: startOfYesterday, $lte: endOfYesterday } }),
  ]);

  // === Calculate totals ===
  const total =
    contact + vehicle + accessories + finance + insurance + service + truevalue;

  const today =
    todayContact +
    todayVehicle +
    todayAccessories +
    todayFinance +
    todayInsurance +
    todayService +
    todayTrueValue;

  const yesterday =
    yContact +
    yVehicle +
    yAccessories +
    yFinance +
    yInsurance +
    yService +
    yTrueValue;

  // Growth rate (compared to yesterday)
  const growthRate = yesterday ? (((today - yesterday) / yesterday) * 100).toFixed(2) : 0;

  return Response.json({
    contact,
    vehicle,
    accessories,
    finance,
    insurance,
    service,
    truevalue,
    total,
    today,
    yesterday,
    growthRate,
  });
}
