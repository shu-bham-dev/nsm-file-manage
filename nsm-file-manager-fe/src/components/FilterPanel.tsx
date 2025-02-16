import React, { forwardRef, useImperativeHandle } from 'react';
import { Close } from '@mui/icons-material';
import { TextField, Button, IconButton } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

interface FilterPanelProps {
  filterText: string;
  setFilterText: (value: string) => void;
  onApply: (filters: { name: string; description: string; date: string | null }) => void;
  onCancel: () => void;
}

const FilterPanel = forwardRef(({ filterText, setFilterText, onApply, onCancel }: FilterPanelProps, ref:any) => {
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [date, setDate] = React.useState<dayjs.Dayjs | null>(null);

 

  const handleApply = () => {
    onApply({ name, description, date: date ? date.toISOString() : null });
  };

  return (
    <div className="p-6 w-[400px] bg-white rounded-xl shadow-lg border border-gray-200">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
        <div className="flex items-center space-x-2">
          <button
            className="text-red-500 text-sm font-medium hover:underline"
            onClick={() => {
              setName('');
              setDescription('');
              setDate(null); ref.current.click();
            }}
          >
            Clear
          </button>
          <IconButton onClick={()=>{
           
            onCancel();
            ref.current.click();
          }} className="text-gray-500 hover:text-gray-700">
            <Close />
          </IconButton>
        </div>
      </div>
      
      {/* Form Section */}
      <form className="space-y-4">
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          variant="outlined"
          sx={{ mb: 2 }}
        />
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          variant="outlined"
          sx={{ mb: 2 }}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Date"
            value={date}
            onChange={(newValue) => setDate(newValue)}
            renderInput={(params) => <TextField {...params} fullWidth />}
          />
        </LocalizationProvider>
        
        {/* Button Section */}
        <div className="flex justify-end mt-4">
          <Button variant="outlined" onClick={onCancel} className="border-gray-400 text-gray-700">
            Cancel
          </Button>
          <Button variant="contained" style={{ backgroundColor: '#2D336B', color: 'white' }} sx={{ ml: 2 }} onClick={()=>{handleApply()

ref.current.click();
          }}>
            
            Apply
          </Button>
        </div>
      </form>
    </div>
  );
});

export default FilterPanel;
