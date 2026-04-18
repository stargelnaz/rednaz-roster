import { useNavigate } from 'react-router-dom';
import { ClipboardList, Flame } from 'lucide-react';

export function ProgramChooserPage() {
  const navigate = useNavigate();

  return (
    <div className='flex flex-col items-center justify-center min-h-[60vh] gap-8'>
      <h2 className='text-2xl font-bold text-navy-900 mb-4'>
        Choose a Program
      </h2>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-xl'>
        <button
          onClick={() => navigate('/roster')}
          className='flex flex-col items-center gap-4 p-8 bg-white border-2 border-navy-100 rounded-2xl shadow-sm hover:border-gold-500 hover:shadow-md transition-all group'
        >
          <div className='p-4 bg-navy-50 rounded-full group-hover:bg-gold-50 transition-colors'>
            <ClipboardList className='w-12 h-12 text-navy-600 group-hover:text-gold-600' />
          </div>
          <div className='text-center'>
            <h3 className='text-xl font-bold text-navy-900'>Service Roster</h3>
            <p className='text-sm text-navy-500 mt-1'>
              Manage and view service assignments
            </p>
          </div>
        </button>

        <button
          onClick={() => navigate('/prayer')}
          className='flex flex-col items-center gap-4 p-8 bg-white border-2 border-navy-100 rounded-2xl shadow-sm hover:border-burnt-orange-500 hover:shadow-md transition-all group'
        >
          <div className='p-4 bg-navy-50 rounded-full group-hover:bg-orange-50 transition-colors'>
            <Flame className='w-12 h-12 text-navy-600 group-hover:text-orange-600' />
          </div>
          <div className='text-center'>
            <h3 className='text-xl font-bold text-navy-900'>
              40 Days of Prayer
            </h3>
            <p className='text-sm text-navy-500 mt-1'>for 5 persons</p>
          </div>
        </button>
      </div>
    </div>
  );
}
