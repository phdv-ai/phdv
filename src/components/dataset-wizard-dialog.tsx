"use client"

import { useState } from "react"
import { Database, Filter, FileText, Users, CheckCircle2, X, ArrowRight, ArrowLeft } from "lucide-react"

const wizardSteps = [
  {
    id: 1,
    title: "Dataset Type",
    description: "Choose the type of dataset you want to create",
  },
  {
    id: 2,
    title: "Data Selection",
    description: "Select which data to include",
  },
  {
    id: 3,
    title: "Privacy Settings",
    description: "Configure anonymization and access",
  },
  {
    id: 4,
    title: "Review & Publish",
    description: "Review and publish your dataset",
  },
]

const datasetTypes = [
  {
    id: "wearable",
    title: "Wearable Data",
    description: "Heart rate, steps, sleep, activity tracking",
    icon: Users,
  },
  {
    id: "clinical",
    title: "Clinical Data",
    description: "Lab results, diagnoses, treatments",
    icon: FileText,
  },
  {
    id: "multimodal",
    title: "Multi-Modal Dataset",
    description: "Combine multiple data sources",
    icon: Database,
  },
]

export function DatasetWizardDialog() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [publishing, setPublishing] = useState(false)
  const [published, setPublished] = useState(false)

  const handleNext = () => {
    if (currentStep < wizardSteps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handlePublish = () => {
    setPublishing(true)
    setTimeout(() => {
      setPublishing(false)
      setPublished(true)
      setTimeout(() => {
        setPublished(false)
        setCurrentStep(1)
        setSelectedType(null)
        setIsOpen(false)
      }, 2000)
    }, 1500)
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="border border-cyan-400 text-cyan-400 font-bold py-2 px-4 rounded-full hover:bg-cyan-400 hover:text-white transition-colors flex items-center gap-2"
      >
        <Database className="h-4 w-4" />
        Create Dataset
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="relative w-full max-w-4xl max-h-[85vh] overflow-y-auto bg-gray-900 border border-cyan-400/50 rounded-2xl p-6 m-4">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10"
            >
              <X className="h-6 w-6" />
            </button>

            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">Create Research Dataset</h2>
              <p className="text-gray-400">
                Package your health data for researchers and earn PHDV tokens
              </p>
            </div>

            {/* Progress Steps */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                {wizardSteps.map((step, index) => (
                  <div key={step.id} className="flex items-center flex-1">
                    <div className="flex flex-col items-center flex-1">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all ${
                          currentStep >= step.id
                            ? "border-cyan-400 bg-cyan-400 text-white"
                            : "border-cyan-400/30 bg-transparent text-cyan-400/50"
                        }`}
                      >
                        {currentStep > step.id ? (
                          <CheckCircle2 className="h-5 w-5" />
                        ) : (
                          <span className="text-sm font-bold">{step.id}</span>
                        )}
                      </div>
                      <div className="mt-2 text-center">
                        <p className={`text-xs font-medium ${currentStep >= step.id ? "text-white" : "text-gray-500"}`}>
                          {step.title}
                        </p>
                      </div>
                    </div>
                    {index < wizardSteps.length - 1 && (
                      <div
                        className={`h-0.5 flex-1 mx-2 mb-6 transition-all ${
                          currentStep > step.id ? "bg-cyan-400" : "bg-cyan-400/30"
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Step Content */}
            <div className="min-h-[300px]">
              {currentStep === 1 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white mb-4">Select Dataset Type</h3>
                  {datasetTypes.map((type) => {
                    const Icon = type.icon
                    const isSelected = selectedType === type.id
                    return (
                      <div
                        key={type.id}
                        className={`p-4 cursor-pointer transition-all rounded-xl border ${
                          isSelected
                            ? "border-cyan-400 bg-cyan-400/10"
                            : "border-cyan-400/30 bg-cyan-900/10 hover:border-cyan-400/50 hover:bg-cyan-900/20"
                        }`}
                        onClick={() => setSelectedType(type.id)}
                      >
                        <div className="flex items-start gap-4">
                          <div
                            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg ${
                              isSelected ? "bg-cyan-400 text-white" : "bg-cyan-400/10 text-cyan-400"
                            }`}
                          >
                            <Icon className="h-6 w-6" />
                          </div>
                          <div className="flex-1 space-y-1">
                            <div className="flex items-center justify-between">
                              <h4 className="font-semibold text-white">{type.title}</h4>
                              {isSelected && <CheckCircle2 className="h-5 w-5 text-cyan-400" />}
                            </div>
                            <p className="text-sm text-gray-400">{type.description}</p>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white mb-4">Select Data to Include</h3>
                  <div className="border border-cyan-400/30 rounded-xl bg-cyan-900/10 p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-white">Sleep Data</p>
                        <p className="text-sm text-gray-400">Last 6 months • 180 nights</p>
                      </div>
                      <input type="checkbox" defaultChecked className="h-5 w-5" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-white">Heart Rate Variability</p>
                        <p className="text-sm text-gray-400">Last 6 months • 180 days</p>
                      </div>
                      <input type="checkbox" defaultChecked className="h-5 w-5" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-white">Activity Data</p>
                        <p className="text-sm text-gray-400">Last 6 months • 180 days</p>
                      </div>
                      <input type="checkbox" className="h-5 w-5" />
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white mb-4">Privacy & Access Settings</h3>
                  <div className="border border-cyan-400/30 rounded-xl bg-cyan-900/10 p-6 space-y-4">
                    <div>
                      <p className="font-medium text-white mb-2">Anonymization Level</p>
                      <select className="w-full bg-gray-800 border border-cyan-400/30 rounded-lg px-4 py-2 text-white">
                        <option>Full Anonymization (Recommended)</option>
                        <option>Partial Anonymization</option>
                        <option>Pseudonymization</option>
                      </select>
                    </div>
                    <div>
                      <p className="font-medium text-white mb-2">Access Type</p>
                      <select className="w-full bg-gray-800 border border-cyan-400/30 rounded-lg px-4 py-2 text-white">
                        <option>Public Research Access</option>
                        <option>Approved Researchers Only</option>
                        <option>Private</option>
                      </select>
                    </div>
                    <div>
                      <p className="font-medium text-white mb-2">Price (PHDV)</p>
                      <input
                        type="number"
                        defaultValue="500"
                        className="w-full bg-gray-800 border border-cyan-400/30 rounded-lg px-4 py-2 text-white"
                      />
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 4 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white mb-4">Review Dataset</h3>
                  <div className="border border-cyan-400/30 rounded-xl bg-cyan-900/10 p-6 space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-400">Type</p>
                        <p className="text-white font-medium">Wearable Data</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Data Points</p>
                        <p className="text-white font-medium">540 records</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Time Range</p>
                        <p className="text-white font-medium">6 months</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Price</p>
                        <p className="text-white font-medium">500 PHDV</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Anonymization</p>
                        <p className="text-white font-medium">Full</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Access</p>
                        <p className="text-white font-medium">Public Research</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-cyan-900/20 border border-cyan-400/30 rounded-lg p-4">
                    <p className="text-xs text-gray-400">
                      By publishing this dataset, you confirm that you have the right to share this data and agree to
                      the terms of service.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between mt-8 pt-4 border-t border-cyan-400/30">
              <button
                onClick={handleBack}
                disabled={currentStep === 1}
                className="flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </button>
              <div className="flex gap-2">
                {currentStep < wizardSteps.length ? (
                  <button
                    onClick={handleNext}
                    disabled={currentStep === 1 && !selectedType}
                    className="flex items-center gap-2 border border-cyan-400 text-cyan-400 font-bold py-2 px-6 rounded-full hover:bg-cyan-400 hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    Next
                    <ArrowRight className="h-4 w-4" />
                  </button>
                ) : (
                  <button
                    onClick={handlePublish}
                    disabled={publishing || published}
                    className="flex items-center gap-2 border border-cyan-400 bg-cyan-400 text-white font-bold py-2 px-6 rounded-full hover:bg-cyan-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {publishing ? "Publishing..." : published ? "Published!" : "Publish Dataset"}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
