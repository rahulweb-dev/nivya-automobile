import AdminNavbar from "@/app/dashboardComponents/AdminNavbar";
import AdminSidebar from "@/app/dashboardComponents/AdminSidebar";
import AdminTable from "@/app/dashboardComponents/AdminTable";


const columns = [
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
  { key: 'number', label: 'Number' },
  { key: 'message', label: 'Message' },
  { key: 'createdAt', label: 'Date' },
];

export default function DashboardPage() {
  return (
    <div className='min-h-screen bg-gray-50 dark:bg-gray-900'>
      <AdminNavbar />
      <AdminSidebar />
      <main className='p-6 pt-24 sm:ml-64'>
        <h1 className='mb-6 text-2xl font-bold text-gray-800 dark:text-white'>
          Admin Dashboard
        </h1>
        <AdminTable
          fetchUrl='/api/contact'
          columns={columns}
          rowsPerPage={10}
        />
      </main>
    </div>
  );
}
