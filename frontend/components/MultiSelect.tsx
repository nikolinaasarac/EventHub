import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList} from "@/components/ui/command";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Button} from "@/components/ui/button";
import {Badge} from "@/components/ui/badge";
import {Separator} from "@/components/ui/separator";
import {CheckIcon, PlusCircledIcon} from '@radix-ui/react-icons';

type Props = {
	title: string;
	options: {
		key: string;
		value: string;
		icon?: React.ComponentType<{ className?: string }>;
	}[];
	selectedValues: string[];
	onSelectChange: (selectedValues: string[]) => void;
}

export function MultiSelect({title, options, selectedValues = [], onSelectChange}: Props) {

	const handleSelectionChange = (optionValue: string) => {
		let updatedSelection = [...selectedValues];
		if (updatedSelection.includes(optionValue)) {
			updatedSelection = updatedSelection.filter(value => value !== optionValue);
		} else {
			updatedSelection.push(optionValue);
		}
		onSelectChange(updatedSelection);
	};

	const FilterContent = (
		<>
			<Command>
				<CommandInput placeholder={`${title}`}/>
				<CommandList>
					<CommandEmpty className={'text-wrap text-center text-base sm:text-sm p-4'}>
						{('No results found')}.
					</CommandEmpty>
					<CommandGroup>
						{options.map(option => (
							<CommandItem
								key={option.key}
								className={'flex gap-2'}
								onSelect={() => handleSelectionChange(option.key)}
							>
								<div
									className={`flex  h-5 w-5 sm:h-4 sm:w-4 items-center justify-center rounded-sm border border-primary ${
										selectedValues?.includes(option.key)
											? 'bg-primary text-primary-foreground'
											: 'opacity-50'
									}`}
								>
									{selectedValues?.includes(option.key) && (
										<CheckIcon className={' w-5 h-5 sm:h-3.5 sm:w-3.5 '}/>
									)}
								</div>
								{option.icon && (
									<option.icon className={'mr-2 h-4 w-4 text-muted-foreground'}/>
								)}
								<div>{option.value}</div>
							</CommandItem>
						))}
					</CommandGroup>
				</CommandList>
			</Command>
			{selectedValues.length > 0 && (
				<div className={'border-t'}>
					<button
						onClick={() => onSelectChange([])}
						className={'relative flex cursor-pointer select-none items-center px-2 py-3 sm:py-1.5 text-base lg:text-sm outline-none data-[disabled=true]:pointer-events-none hover:bg-accent hover:text-accent-foreground data-[disabled=true]:opacity-50 w-full justify-center'}
					>
						{('Očisti filtere')}
					</button>
				</div>
			)}
		</>
	);

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button variant="outline" className="w-full border-dashed hover:cursor-pointer">
					<PlusCircledIcon className="mr-2 h-4 w-4"/>
					{title}
					{selectedValues.length > 0 && (
						<>
							<Separator orientation="vertical" className="mx-2 h-4"/>
							<Badge variant="secondary" className="rounded-sm px-2 font-normal">
								Izabrano: {selectedValues.length}
							</Badge>
						</>
					)}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="p-0" align="start">
				{FilterContent}
			</PopoverContent>
		</Popover>
	);
}