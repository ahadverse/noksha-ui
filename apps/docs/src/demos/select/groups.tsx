import { SelectContent, SelectGroup, SelectItem, SelectRoot, SelectTrigger } from '@prism-ui/react';

export default function SelectGroups() {
  return (
    <div className="w-full max-w-sm">
      <SelectRoot defaultValue="ts">
        <SelectTrigger placeholder="Pick a language" />
        <SelectContent>
          <SelectGroup label="Typed">
            <SelectItem value="ts">TypeScript</SelectItem>
            <SelectItem value="rs">Rust</SelectItem>
            <SelectItem value="go">Go</SelectItem>
          </SelectGroup>
          <SelectGroup label="Dynamic">
            <SelectItem value="js">JavaScript</SelectItem>
            <SelectItem value="py">Python</SelectItem>
            <SelectItem value="rb">Ruby</SelectItem>
          </SelectGroup>
        </SelectContent>
      </SelectRoot>
    </div>
  );
}
