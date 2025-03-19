
import { Controller, SubmitHandler, useForm } from "react-hook-form";

interface InputFieldProps {
  control: any;
  name: string;
  label: string;
  placeholder: string;
  value: string;
  setValue: (value: string) => void;
  error?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  control,
  name,
  label,
  placeholder,
  value,
  setValue,
  error,
}) => {
  return (
    <div className="flex flex-col py-3">
      <label className="uppercase text-xs font-bold text-gray-700 my-2" htmlFor={name}>
        {label} :
      </label>
      <Controller
        name={name}
        control={control}
        rules={{ required: `${label} harus terisi` }}
        render={({ field }) => (
          <>
            <input
              {...field}
              className="border px-4 py-2 rounded-lg"
              id={name}
              type="text"
              placeholder={placeholder}
              value={field.value || value}
              onChange={(e) => {
                field.onChange(e);
                setValue(e.target.value);
              }}
            />
            {error ? (
              <h1 className="text-red-500">{error}</h1>
            ) : (
              <h1 className="text-slate-300 text-xs">*{label} Harus Terisi</h1>
            )}
          </>
        )}
      />
    </div>
  );
};

export default InputField;
