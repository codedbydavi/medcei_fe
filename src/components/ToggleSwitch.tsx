type ToggleSwitchProps = {
  enabled: boolean;
  onToggle: () => void | Promise<void>;
};

const ToggleSwitch = ({ enabled, onToggle }: ToggleSwitchProps) => (
  <button
    onClick={onToggle}
    className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
      enabled ? 'bg-green-500' : 'bg-gray-300'
    }`}
  >
    <div
      className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
        enabled ? 'translate-x-6' : ''
      }`}
    ></div>
  </button>
);

export default ToggleSwitch;
