import { useQuery } from "@tanstack/react-query"
import axios from "../../lib/axios"
import SelectField3 from "./select3";
import { LucideLoaderCircle } from "lucide-react";


type ListProps = {
  className?: string,
  loadClassName?: string,
  qKey: string,
  url: string,
  labelKey?: string,
  keyName?: string,
  params?: { [key: string]: string | number }
  string?: string
  label: string
  renderItem?: (items) => React.ReactNode;
  dropDownOptions?: { [key: string]: unknown }[],
  name: string,
  onChange?: (payload: { name: string; value: string }) => void;
};
// eslint-disable-next-line react-refresh/only-export-components
export default ({ label, loadClassName = '', className = '', onChange, url, name, keyName = 'id', renderItem, labelKey = 'name', qKey = 'todos', params }: ListProps) => {
  const { isPending, isError, data, error } = useQuery({
    queryKey: [qKey],
    queryFn: async () => {
      const res = await axios.get(url, params)
      const options = res.data.data.map((element: { [x: string]: string | number }) => {
        return { value: element[keyName], label: element[labelKey] }
      })
      console.log('--------------------options------------------------------')
      console.log(options)
      console.log(res.data.data)
      return options
    }
  })



  const handleChange = (e: { name: string; value: string }) => {
    onChange?.({ name, value: e.value });
  };

  if (isPending) {
    return <span className={loadClassName}>  <LucideLoaderCircle className="animate-spin" size={28}/></span>
  }

  if (isError) {
    return <span className={loadClassName}>Error: {error.message}</span>
  }



  return renderItem ? renderItem(data) : <SelectField3 label={label} className={className} onInputed={handleChange} name={name} options={data} />
}