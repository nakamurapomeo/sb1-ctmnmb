export interface StoryElement {
  id: string;
  category: 'protagonist' | 'setting' | 'world';
  value: string;
}

export interface StoryElementsState {
  protagonist: StoryElement[];
  setting: StoryElement[];
  world: StoryElement[];
  selected: {
    protagonist: string;
    setting: string;
    world: string;
  };
}