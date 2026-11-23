type DummyImageProps = {
  className?: string
  label?: string
}

// Fallback for an image-area field that has no real upload yet. Once an
// editor uploads a real image, the field is no longer empty and this
// never renders -- no code change needed to "remove" it later.
export function DummyImage({ className = '', label = 'Dummy image' }: DummyImageProps) {
  return (
    <div
      className={`flex items-center justify-center border border-dashed border-text-secondary/40 bg-surface font-mono text-xs text-text-secondary ${className}`}
    >
      [{label}]
    </div>
  )
}
