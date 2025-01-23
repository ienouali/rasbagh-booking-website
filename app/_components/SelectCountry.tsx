import { getCountries } from '@/app/_lib/data-service';

type TCountry = {
  defaultCountry: string;
  name: string;
  id: number | string;
  flag?: string;
  className: string;
}

async function SelectCountry({ defaultCountry, name, id, className }: TCountry) {
  const countries: TCountry[] = await getCountries();
  const flag =
    countries.find((country: TCountry) => country.name === defaultCountry)?.flag ?? '';

  return (
    <select
      name={name}
      id={id as string}
      defaultValue={`${defaultCountry}%${flag}`}
      className={className}
    >
      <option value=''>Select country...</option>
      {countries.map((c) => (
        <option key={c.name} value={`${c.name}%${c.flag}`}>
          {c.name}
        </option>
      ))}
    </select>
  );
}

export default SelectCountry;
