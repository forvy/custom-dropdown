# Custom Dropdown Component

The `Dropdown` component is a versatile and customizable dropdown menu for React applications. It supports multiple selection, search functionality, and can be rendered inside a portal to avoid clipping issues.

## Features

- Searchable options where you can search dropdown to filter long list into short one
- Portal support for rendering outside of the parent component
- Single and multi-select modes
- Customizable option rendering
- Customizable label
- Z-index compatibility where you can customize option z-index

## Installation

### `npm install`

To use this component

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.

### `npm run storybook`

Launches the storybook in the interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.
Your app is ready to be deployed!

## Usage

### Basic Usage

Import the `Dropdown` component and use it in your React application.

```jsx
import React from "react";
import Dropdown from "./Dropdown"; // Adjust the import path as needed

const options = ["Option 1", "Option 2", "Long Option 3", "Long Long Option 4"];

function App() {
  return (
    <div className="p-3">
      <h1 className="text-2xl mb-4">Single Dropdown Example</h1>
      <div className="mx-4">
        <Dropdown label="Select an Option" options={options} />
      </div>
    </div>
  );
}

export default App;
```

### Multi-Select and Searchable Dropdown

To enable multi-select and searchable features, set the `multiSelect` and `searchable` props to `true`.

```jsx
import React from "react";
import Dropdown from "./Dropdown";

const options = ["Option 1", "Option 2", "Long Option 3", "Long Long Option 4"];

function App() {
  return (
    <div className="p-3">
      <h1 className="text-2xl mb-4">
        Multi-Select Searchable Dropdown Example
      </h1>
      <div className="mx-4">
        <Dropdown
          label="Select Options"
          options={options}
          multiSelect
          searchable
        />
      </div>
    </div>
  );
}

export default App;
```

### Custom Option Rendering

You can customize how each option is rendered by providing a `renderOption` function.

```jsx
import React from "react";
import Dropdown from "./Dropdown";

const options = ["Option 1", "Option 2", "Long Option 3", "Long Long Option 4"];

function App() {
  const renderOption = (option) => (
    <span className="custom-option">{option}</span>
  );

  return (
    <div className="p-3">
      <h1 className="text-2xl mb-4">Custom Option Rendering Example</h1>
      <div className="mx-4">
        <Dropdown
          label="Select an Option"
          options={options}
          renderOption={renderOption}
        />
      </div>
    </div>
  );
}

export default App;
```

### Using Portal

To render the dropdown inside a portal, set the `usePortal` prop to `true`.

```jsx
import React from "react";
import Dropdown from "./Dropdown";

const options = ["Option 1", "Option 2", "Long Option 3", "Long Long Option 4"];

function App() {
  return (
    <div className="p-3">
      <h1 className="text-2xl mb-4">Dropdown with Portal Example</h1>
      <div className="mx-4">
        <Dropdown label="Select an Option" options={options} usePortal />
      </div>
    </div>
  );
}

export default App;
```

## Props

| Prop           | Type     | Default | Description                                                                           |
| -------------- | -------- | ------- | ------------------------------------------------------------------------------------- |
| `label`        | string   | 'Label' | The label displayed next to the dropdown.                                             |
| `options`      | array    | []      | Array of options. Options can be strings or objects with `id` and `label` properties. |
| `multiSelect`  | bool     | false   | Enable multi-select functionality.                                                    |
| `searchable`   | bool     | false   | Enable search functionality.                                                          |
| `renderOption` | function | null    | Custom function to render options.                                                    |
| `zIndex`       | number   | 9999    | The z-index of the dropdown menu.                                                     |
| `usePortal`    | bool     | false   | Render the dropdown in a portal.                                                      |

## Example Storybook

To see examples of the `Dropdown` component in action, you can refer to the [Storybook](https://storybook-custom-dropdown.netlify.app/) or the following example Storybook configuration for the `Dropdown` component:

```jsx
import React from "react";
import Dropdown from "./Dropdown";

// Sample data
const options = ["Option 1", "Option 2", "Long Option 3", "Long Long Option 4"];
const objectOptions = [
  { id: 1, label: "Option 1" },
  { id: 2, label: "Option 2" },
  { id: 3, label: "Long Option 3" },
  { id: 4, label: "Long Long Option 4" },
];

export default {
  title: "Components/Dropdown",
  component: Dropdown,
  argTypes: {
    label: { control: "text" },
    options: { control: "array" },
    multiSelect: { control: "boolean" },
    searchable: { control: "boolean" },
    renderOption: { control: "function" },
    zIndex: { control: "number" },
    usePortal: { control: "boolean" },
  },
};

const Template = (args) => <Dropdown {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: "Default Label",
  options,
  multiSelect: false,
  searchable: false,
  zIndex: 1000,
  usePortal: false,
};

export const MultiSelect = Template.bind({});
MultiSelect.args = {
  label: "Multi-Select Dropdown",
  options,
  multiSelect: true,
  searchable: true,
  zIndex: 1000,
  usePortal: false,
};

export const Searchable = Template.bind({});
Searchable.args = {
  label: "Searchable Dropdown",
  options,
  multiSelect: false,
  searchable: true,
  zIndex: 1000,
  usePortal: false,
};

export const WithObjectOptions = Template.bind({});
WithObjectOptions.args = {
  label: "Dropdown with Object Options",
  options: objectOptions.map((opt) => opt.label),
  multiSelect: false,
  searchable: true,
  zIndex: 1000,
  renderOption: (option) => <span>{option}</span>,
  usePortal: false,
};

export const WithPortal = Template.bind({});
WithPortal.args = {
  label: "Dropdown with Portal",
  options,
  multiSelect: false,
  searchable: true,
  zIndex: 1000,
  usePortal: true,
};
```
