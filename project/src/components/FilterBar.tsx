import React, { useState } from 'react';
import { Filter, ChevronDown, X } from 'lucide-react';
import Button from './ui/Button';
import Badge from './ui/Badge';

type FilterBarProps = {
  onFilterChange: (filters: {
    area?: string;
    type?: string[];
    price?: number[];
    tags?: string[];
  }) => void;
};

const FilterBar = ({ onFilterChange }: FilterBarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedArea, setSelectedArea] = useState<string>();
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedPrices, setSelectedPrices] = useState<number[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const areas = ['Downtown', 'Midtown', 'Uptown', 'West End', 'East Side'];
  const types = ['Restaurant', 'Bar', 'Club', 'Cafe', 'Lounge'];
  const prices = [1, 2, 3]; // $ to $$$
  const tags = ['Live Music', 'Sports Bar', 'Craft Beer', 'Cocktails', 'Wine', 'Rooftop', 'Outdoor Seating'];

  const toggleFilter = () => {
    setIsOpen(!isOpen);
  };

  const toggleType = (type: string) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter(t => t !== type));
    } else {
      setSelectedTypes([...selectedTypes, type]);
    }
  };

  const togglePrice = (price: number) => {
    if (selectedPrices.includes(price)) {
      setSelectedPrices(selectedPrices.filter(p => p !== price));
    } else {
      setSelectedPrices([...selectedPrices, price]);
    }
  };

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const selectArea = (area: string) => {
    setSelectedArea(area === selectedArea ? undefined : area);
  };

  const applyFilters = () => {
    onFilterChange({
      area: selectedArea,
      type: selectedTypes,
      price: selectedPrices,
      tags: selectedTags
    });
    setIsOpen(false);
  };

  const resetFilters = () => {
    setSelectedArea(undefined);
    setSelectedTypes([]);
    setSelectedPrices([]);
    setSelectedTags([]);
    onFilterChange({});
  };

  const getTotalFiltersCount = () => {
    let count = 0;
    if (selectedArea) count++;
    count += selectedTypes.length;
    count += selectedPrices.length;
    count += selectedTags.length;
    return count;
  };

  return (
    <div className="mb-4">
      <div className="flex items-center">
        <Button 
          variant="outline"
          className="flex items-center space-x-1 border-gray-300"
          onClick={toggleFilter}
        >
          <Filter size={16} />
          <span>Filters</span>
          {getTotalFiltersCount() > 0 && (
            <Badge variant="primary" className="ml-1">{getTotalFiltersCount()}</Badge>
          )}
          <ChevronDown size={16} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </Button>

        {/* Active filters display */}
        {getTotalFiltersCount() > 0 && (
          <div className="ml-2 flex flex-wrap gap-1">
            {selectedArea && (
              <Badge variant="primary" className="flex items-center">
                {selectedArea}
                <X 
                  size={14} 
                  className="ml-1 cursor-pointer" 
                  onClick={() => selectArea(selectedArea)}
                />
              </Badge>
            )}

            {selectedTypes.map(type => (
              <Badge key={type} variant="secondary" className="flex items-center">
                {type}
                <X 
                  size={14} 
                  className="ml-1 cursor-pointer" 
                  onClick={() => toggleType(type)}
                />
              </Badge>
            ))}

            {selectedPrices.map(price => (
              <Badge key={price} variant="default" className="flex items-center">
                {Array(price).fill('$').join('')}
                <X 
                  size={14} 
                  className="ml-1 cursor-pointer" 
                  onClick={() => togglePrice(price)}
                />
              </Badge>
            ))}

            {selectedTags.length > 0 && (
              <Badge variant="success" className="flex items-center">
                {selectedTags.length} tags
                <X 
                  size={14} 
                  className="ml-1 cursor-pointer" 
                  onClick={() => setSelectedTags([])}
                />
              </Badge>
            )}

            <Button 
              variant="ghost" 
              size="sm" 
              className="text-xs text-gray-500"
              onClick={resetFilters}
            >
              Reset
            </Button>
          </div>
        )}
      </div>

      {/* Filter dropdown */}
      {isOpen && (
        <div className="bg-white shadow-lg rounded-lg mt-2 p-4 border border-gray-100 animate-in slide-in-from-top-5 duration-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Area filter */}
            <div>
              <h3 className="font-medium text-gray-700 mb-2">Area</h3>
              <div className="space-y-1">
                {areas.map(area => (
                  <button
                    key={area}
                    className={`block w-full text-left px-3 py-1.5 rounded text-sm ${
                      selectedArea === area
                        ? 'bg-ember-light text-ember-dark'
                        : 'text-gray-600 hover:bg-paper'
                    }`}
                    onClick={() => selectArea(area)}
                  >
                    {area}
                  </button>
                ))}
              </div>
            </div>

            {/* Venue type and price */}
            <div>
              <h3 className="font-medium text-gray-700 mb-2">Venue Type</h3>
              <div className="flex flex-wrap gap-1 mb-4">
                {types.map(type => (
                  <button
                    key={type}
                    className={`px-3 py-1 rounded-full text-xs ${
                      selectedTypes.includes(type)
                        ? 'bg-ember-light text-ember-dark'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    onClick={() => toggleType(type)}
                  >
                    {type}
                  </button>
                ))}
              </div>

              <h3 className="font-medium text-gray-700 mb-2">Price</h3>
              <div className="flex gap-2">
                {prices.map(price => (
                  <button
                    key={price}
                    className={`px-3 py-1 rounded-full text-xs ${
                      selectedPrices.includes(price)
                        ? 'bg-amber-100 text-amber-700'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    onClick={() => togglePrice(price)}
                  >
                    {Array(price).fill('$').join('')}
                  </button>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div>
              <h3 className="font-medium text-gray-700 mb-2">Vibes & Features</h3>
              <div className="flex flex-wrap gap-1">
                {tags.map(tag => (
                  <button
                    key={tag}
                    className={`px-3 py-1 rounded-full text-xs ${
                      selectedTags.includes(tag)
                        ? 'bg-rose-100 text-rose-700'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    onClick={() => toggleTag(tag)}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-4 pt-3 border-t border-gray-100">
            <Button 
              variant="outline" 
              size="sm" 
              className="mr-2"
              onClick={resetFilters}
            >
              Reset
            </Button>
            <Button variant="primary" size="sm" onClick={applyFilters}>
              Apply Filters
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterBar;