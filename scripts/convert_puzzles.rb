#!/usr/bin/env ruby

sorted_files = (Dir.glob("/home/phtrivier/prj/ube/data/lua/puzzles/tutorial*.lua").sort do |filename1, filename2|

  pz1 = filename1.match(/.*tutorial([0-9]*).lua/)[1]
  pz2 = filename2.match(/.*tutorial([0-9]*).lua/)[1]

  if (pz1 < pz2)
    -1
  elsif (pz1 == pz2)
    0
  else
    1
  end

end)

sorted_files.each do |filename|
    str = File.open(filename).read

    str.each_line do |line|

      # Try and match the beginning of the rows
      m = line.match(/set_puzzle_rows\(\{(.*)/)
      if (m != nil)
        puts "p({title : { fr : 'TODO' },"
        puts "rows : [#{m[1]}"

      else

        # Try and match list of moves
        m = line.match(/set_puzzle_moves\(\{(.*)\}\)/)
        if (m != nil)
          puts "moves : [#{m[1]}]});"
        else
          # TODO : end of rows
          m = line.match(/(.*)\}\)/)
          if (m != nil)
            puts "#{m[1]}],"
          else
            puts line
          end
          
        end

      end

    end

end
