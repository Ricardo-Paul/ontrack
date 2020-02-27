class Day < ApplicationRecord
    has_many :tasks, dependent: :destroy
    has_many :notes, dependent: :destroy
    has_many :lessons, dependent: :destroy
end
