export interface PreviewLineItem {
  label: string;
  value: string;
}

export interface PreviewSection {
  title: string;
  items: PreviewLineItem[];
}

export interface DeliveryRequirementPreview {
  title: string;
  subtitle: string;
  sections: PreviewSection[];
  generatedAt: string;
}
