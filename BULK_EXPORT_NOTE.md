# Bulk Export Feature - Implementation Note

## Installation Required:

Before using the bulk export feature, install JSZip:

```bash
cd frontend
npm install jszip
```

## Feature Description:

The bulk export feature allows users to export all their resumes as PDFs in a single ZIP file.

### How it works:
1. User clicks "Export All" button on Resumes page
2. System generates PDF for each resume
3. PDFs are packaged into a ZIP file
4. ZIP file is downloaded automatically

### Files Modified:
- `frontend/src/pages/ResumesPage.jsx` - Added export all button and handler
- `frontend/package.json` - Added jszip dependency

### Usage:
1. Navigate to Resumes page
2. Click "Export All" button in header
3. Wait for generation (shows progress)
4. ZIP file downloads automatically

### Technical Details:
- Uses html2pdf.js for PDF generation
- Uses JSZip for ZIP creation
- Generates PDFs sequentially to avoid memory issues
- Shows loading state during generation
- File naming: `{resume-title}.pdf`
- ZIP naming: `SmartResume-All-Resumes-{date}.zip`

## Note:
This feature requires the jszip package to be installed. The implementation is ready but needs the dependency to be added to package.json.
