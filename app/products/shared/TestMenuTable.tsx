/**
 * Formal test-menu table for analyzer modals (Tosoh, DiaSorin, ILab,
 * BIO-FLASH): Panel | Assays, sticky header, zebra rows, scrolling inside its
 * box. Long panels list their assays in columns so they stay scannable;
 * short ones read as one line.
 */
export type TestMenu = [panel: string, assays: string[]][];

/** Distinct assays (some sit in two panels, e.g. MMRV and ToRCH). */
export const countAssays = (menu: TestMenu) => new Set(menu.flatMap(([, a]) => a.map((x) => x.replace(/[*†]+$/, '').trim()))).size;

export default function TestMenuTable({ menu, footer, className = 'h-[240px] md:h-[430px]' }: { menu: TestMenu; footer?: string; className?: string }) {
	return (
		<div className={`flex w-full flex-col overflow-hidden rounded-lg border border-gray-200 ${className}`}>
			<div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
				<table className="w-full table-fixed border-collapse text-left text-xs sm:text-sm">
					<colgroup>
						<col className="w-[34%] sm:w-[28%]" />
						<col />
					</colgroup>
					<thead className="sticky top-0 z-10 bg-[#2B3990] text-white">
						<tr>
							<th scope="col" className="px-3 py-2 font-semibold sm:px-4">Panel</th>
							<th scope="col" className="px-3 py-2 font-semibold sm:px-4">Assays</th>
						</tr>
					</thead>
					<tbody>
						{menu.map(([panel, assays], i) => (
							<tr key={panel} className={`align-top ${i % 2 ? 'bg-gray-50' : 'bg-white'}`}>
								<th scope="row" className="break-words [hyphens:auto] border-t border-gray-200 px-3 py-2 font-semibold text-[#2B3990] sm:px-4 sm:py-2.5">
									{panel}
									<span className="block text-[11px] font-normal text-gray-400 sm:text-xs">
										{assays.length} assay{assays.length === 1 ? '' : 's'}
									</span>
								</th>
								<td className="border-t border-gray-200 px-3 py-2 leading-relaxed text-gray-700 sm:px-4 sm:py-2.5">
									{assays.length > 8 ? (
										<ul className="columns-2 gap-x-4 md:columns-3">
											{assays.map((a) => (
												<li key={a} className="inline-block w-full break-inside-avoid pl-2 -indent-2">{a}</li>
											))}
										</ul>
									) : (
										assays.join(' · ')
									)}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			<p className="shrink-0 border-t border-gray-200 bg-gray-50 px-3 py-2 text-[11px] italic text-gray-500 sm:px-4 sm:text-xs">
				{footer ? `${footer} · ` : ''}
				{countAssays(menu)} assays
			</p>
		</div>
	);
}
