import React from 'react';
import TemplateModern from './TemplateModern';
import TemplateClassic from './TemplateClassic';
import TemplateMinimalist from './TemplateMinimalist';
import TemplateTwoColumn from './TemplateTwoColumn';
import TemplateTechnical from './TemplateTechnical';
import TemplateExecutive from './TemplateExecutive';
import TemplateCreative from './TemplateCreative';
import TemplateBold from './TemplateBold';
import TemplateTimeline from './TemplateTimeline';
import TemplateSidebar from './TemplateSidebar';

const templates = {
    'modern': TemplateModern,
    'classic': TemplateClassic,
    'minimalist': TemplateMinimalist,
    'twocolumn': TemplateTwoColumn,
    'technical': TemplateTechnical,
    'executive': TemplateExecutive,
    'creative': TemplateCreative,
    'bold': TemplateBold,
    'timeline': TemplateTimeline,
    'sidebar': TemplateSidebar
};

const TemplateRenderer = ({ templateId, ...props }) => {
    const Template = templates[templateId] || TemplateModern;
    return <Template {...props} />;
};

export default TemplateRenderer;
