import React from 'react';
import icon from '../assets/favicon.ico';
import Dropdown from '../components/Dropdown';
import '../index.css';

const options = ['Option 1', 'Option 2', 'Long Option 3', 'Long Long Option 4'];
const objectOptions = [
  { id: 1, label: 'Option 1' },
  { id: 2, label: 'Option 2' },
  { id: 3, label: 'Long Option 3' },
  { id: 4, label: 'Long Long Option 4' }
];

export default {
  title: 'Components/Dropdown',
  component: Dropdown,
  argTypes: {
    label: { control: 'text' },
    options: { control: 'array' },
    multiSelect: { control: 'boolean' },
    searchable: { control: 'boolean' },
    renderOption: { control: 'function' },
    zIndex: { control: 'number' },
    usePortal: { control: 'boolean' },
  },
};

const Template = (args) => <Dropdown {...args} />;

export const Select = Template.bind({});
Select.args = {
  label: 'Select Dropdown',
  options,
  multiSelect: false,
  searchable: false,
  zIndex: 1000,
  usePortal: false,
};

export const MultiSelect = Template.bind({});
MultiSelect.args = {
  label: 'Multi-Select Dropdown',
  options,
  multiSelect: true,
  searchable: true,
  zIndex: 1000,
  usePortal: false,
};

export const Searchable = Template.bind({});
Searchable.args = {
  label: 'Searchable Dropdown',
  options,
  multiSelect: false,
  searchable: true,
  zIndex: 1000,
  usePortal: false,
};

export const WithObjectOptions = Template.bind({});
WithObjectOptions.args = {
  label: 'Dropdown with Object Options',
  options: objectOptions,
  multiSelect: false,
  searchable: true,
  zIndex: 1000,
  usePortal: false,
};

export const WithRenderOptions = Template.bind({});
WithRenderOptions.args = {
  label: 'Dropdown with Render Options',
  options: objectOptions,
  multiSelect: false,
  searchable: true,
  zIndex: 1000,
  renderOption: (option) => <span className='flex gap-2'><img src={icon} width={20} />Render - {option}</span>,
  usePortal: false,
};

export const WithPortal = Template.bind({});
WithPortal.args = {
  label: 'Dropdown with Portal',
  options,
  multiSelect: false,
  searchable: true,
  zIndex: 1000,
  usePortal: true,
};
