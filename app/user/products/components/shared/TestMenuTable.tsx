/**
 * Formal test-menu table for analyzer modals (Tosoh, DiaSorin, ILab):
 * Panel | Assays, sticky header, zebra rows, fixed-size box that scrolls
 * inside. Long panels list their assays in two columns so they stay
 * scannable; short ones read as one line.
 */
export type TestMenu = [panel: string, assays: string[]][];

export default function TestMenuTable({ menu, footer }: { menu: TestMenu; footer?: string }) {
	// Some assays sit in two panels (e.g. MMRV and ToRCH): count each once.
	const total = new Set(menu.flatMap(([, a]) => a.map((x) => x.replace(/[*†]+$/, '').trim()))).size;
	return (
		<div className="flex h-[240px] w-full flex-col overflow-hidden rounded-lg border border-gray-200 md:h-[430px]">
			<div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
				<table className="w-full table-fixed border-collapse text-left text-[9px] md:text-xs">
					<colgroup>
						<col className="w-[38%] md:w-[40%]" />
						<col />
					</colgroup>
					<thead className="sticky top-0 z-10 bg-[#2B3990] text-white">
						<tr>
							<th scope="col" className="px-2 py-1.5 font-semibold md:px-3 md:py-2">Panel</th>
							<th scope="col" className="px-2 py-1.5 font-semibold md:px-3 md:py-2">Assays</th>
						</tr>
					</thead>
					<tbody>
						{menu.map(([panel, assays], i) => (
							<tr key={panel} className={`align-top ${i % 2 ? 'bg-gray-50' : 'bg-white'}`}>
								<th scope="row" className="border-t border-gray-200 px-2 py-1.5 font-semibold text-[#2B3990] break-words md:px-3 md:py-2">
									{panel}
									<span className="block text-[8px] font-normal text-gray-400 md:text-[11px]">{assays.length} assay{assays.length === 1 ? '' : 's'}</span>
								</th>
								<td className="border-t border-gray-200 px-2 py-1.5 leading-relaxed text-gray-700 md:px-3 md:py-2">
									{assays.length > 8 ? (
										<ul className="columns-2 gap-x-3">
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
			<p className="shrink-0 border-t border-gray-200 bg-gray-50 px-2 py-1.5 text-[8px] italic text-gray-500 md:px-3 md:text-[11px]">
				{footer ? `${footer} · ` : ''}
				{total} assays
			</p>
		</div>
	);
}
